import React, {Component} from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'
import {reqRoles, reqAddRole, reqUpdateRole} from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import {formateDate} from '../../utils/dateUtils'
import storageUtils from "../../utils/storageUtils";
import {connect} from 'react-redux'
import {logout} from '../../redux/actions'


class Role extends Component {

    state = {
        roles: [],
        role: {},
        isShowAdd: false,
        isShowAuth: false,
    };

    constructor (props) {
        super(props);
        this.auth = React.createRef()
    }

    initColumn = () => {
        this.columns = [
            {
                title: 'Role Name',
                dataIndex: 'name'
            },
            {
                title: 'Create Time',
                dataIndex: 'create_time',
                render: (create_time) => formateDate(create_time)
            },
            {
                title: 'Auth Time',
                dataIndex: 'auth_time',
                render: formateDate
            },
            {
                title: 'Auth Name',
                dataIndex: 'auth_name'
            },
        ]
    };

    getRoles = async () => {
        const result = await reqRoles();
        if (result.status===0) {
            const roles = result.data;
            this.setState({
                roles
            })
        }
        else if (result.status===1){
            message.warning(result.msg);
        }
        else{
            message.error(result.msg);
        }
    };


    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({
                    role
                })
            },
        }
    };

    addRole = () => {
        this.form.validateFields(async (error, values) => {
            if (!error) {

                this.setState({
                    isShowAdd: false
                });

                const {roleName} = values;
                this.form.resetFields();

                const result = await reqAddRole(roleName);
                if (result.status===0) {
                    message.success('Add Role Successfully');
                    const role = result.data;
                    this.setState(state => ({
                        roles: [...state.roles, role]
                    }))

                } else if(result.status===1){
                    message.warning(result.msg);
                }else
                    {
                    message.error(result.msg);
                }


            }
        })


    };


    updateRole = async () => {
        this.setState({
            isShowAuth: false
        });

        const role = this.state.role;
        role.menus = this.auth.current.getMenus();
        role.auth_time = Date.now();
        role.auth_name = this.props.user.username;


        const result = await reqUpdateRole(role);
        if (result.status===0) {
            message.success('Auth Successfully');
            if (role._id === this.props.user.role_id) {
                this.props.logout();
                storageUtils.removeUser();
                this.props.history.replace('/login')
            } else {
                this.setState({
                    roles: [...this.state.roles]
                })
            }
        }else{
            message.error(result.msg)
        }
    };

    componentWillMount () {
        this.initColumn()
    }

    componentDidMount () {
        this.getRoles();
    }

    render() {

        const {roles, role, isShowAdd, isShowAuth} = this.state;
        const title = (
            <span>
        <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>Create Role</Button> &nbsp;&nbsp;
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShowAuth: true})}>Auth</Button>
      </span>
        );

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{defaultPageSize: 3}}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id],
                        onSelect: (role) => {
                            this.setState({
                                role
                            })
                        }

                    }}
                    onRow={this.onRow}
                />

                <Modal
                    title="Add Role"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({isShowAdd: false})
                        this.form.resetFields()
                    }}
                >
                    <AddForm
                        setForm={(form) => this.form = form}
                    />
                </Modal>
                <Modal
                    title="Auth"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({isShowAuth: false})
                    }}
                >
                    <AuthForm ref={this.auth} role={role}/>
                </Modal>
            </Card>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {logout}
)(Role)
