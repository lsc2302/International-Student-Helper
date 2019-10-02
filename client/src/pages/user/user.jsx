import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import {formateDate} from "../../utils/dateUtils"
import LinkButton from "../../components/link-button/index"
import {reqDeleteUser, reqUsers, reqAddOrUpdateUser} from "../../api/index";
import UserForm from './user-form'

export default class User extends Component {

  state = {
    users: [],
    roles: [],
    isShow: false,
  };

  initColumns = () => {
    this.columns = [
      {
        title: 'username',
        dataIndex: 'username'
      },
      {
        title: 'email',
        dataIndex: 'email'
      },

      {
        title: 'phone',
        dataIndex: 'phone'
      },
      {
        title: 'create Time',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: 'role',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: 'modify',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>modify</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>delete</LinkButton>
          </span>
        )
      },
    ]
  };

  initRoleNames = (roles) => {
    this.roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre
    }, {})
  };


  showAdd = () => {
    this.user = null;
    this.setState({isShow: true})
  };


  showUpdate = (user) => {
    this.user = user;
    this.setState({
      isShow: true
    })
  };


  deleteUser = (user) => {
    Modal.confirm({
      title: `Are you sure that you want to delete ${user.username}?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if(result.status===0) {
          message.success('Delete User Successfully!');
          this.getUsers()
        }
        else if (result.status===2) {
          message.error(result.data);
        }
      }
    })
  };


  addOrUpdateUser = async () => {

    this.setState({isShow: false});

    const user = this.form.getFieldsValue();
    this.form.resetFields();
    if (this.user) {
      user._id = this.user._id
    }
    const result = await reqAddOrUpdateUser(user);
    if(result.status===0) {
      message.success(`${this.user ? 'Update' : 'Add'}User Successfully`);
      this.getUsers()
    }
    else if(result.status===1) {
      message.warning(result.msg);
    }
    else{
      message.error(result.msg);
    }
  };

  getUsers = async () => {
    const result = await reqUsers();
    if (result.status===0) {
      const {users, roles} = result.data;
      this.initRoleNames(roles);
      this.setState({
        users,
        roles
      })
    }
    else if(result.status===1){
      message.warning(result.msg);
    }
    else{
      message.error(result.msg);
    }
  };

  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getUsers()
  }


  render() {

    const {users, roles, isShow} = this.state;
    const user = this.user || {};

    const title = <Button type='primary' onClick={this.showAdd}>Create User</Button>

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{defaultPageSize: 5}}
        />

        <Modal
          title={user._id ? 'Update User' : 'Add User'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.form.resetFields();
            this.setState({isShow: false})
          }}
        >
          <UserForm
            setForm={form => this.form = form}
            roles={roles}
            user={user}
          />
        </Modal>

      </Card>
    )
  }
}
