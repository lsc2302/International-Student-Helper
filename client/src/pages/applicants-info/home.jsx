import React, {Component} from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message
} from 'antd'
import {reqAppByAppName, reqAppByUniversity,reqAppByNation,
    reqAppBySchool, reqAppByScore, reqAppByDegree, reqApp} from '../../api'
import {connect} from 'react-redux'

class AppHome extends Component {

    state = {
        Apps: [],
        searchName: '',
        searchType: 'All',
        low_bound:0,
        up_bound:100,
    };

    hasAuthModify = () => {
        const username = this.props.user.username;
        if(username === 'admin')
            return true;
        const menus = this.props.user.role.menus;
        return !!(menus.indexOf('/app/modify') !== -1);
    };

    initColumns = () => {
        this.columns = [
            {
                title: 'App Name',
                dataIndex: 'AppName',
            },
            {
                title: 'Target University',
                dataIndex: 'University',
            },
            {
                title: 'Nation',
                dataIndex: 'Nation',
            },
            {
                title: 'Test Score',
                dataIndex: 'Score',
            },
            {
                title: 'Grad School',
                dataIndex: 'School',
            },
            {
                title: 'Degree',
                dataIndex: 'Degree',
            },
        ];
    };

    getApps = async () => {
        const {searchName, searchType, low_bound, up_bound} = this.state;
        let result;
        switch(searchType){
            case("All"):
                result = await reqApp();
                break;
            case("AppName"):
                result = await reqAppByAppName(searchName);
                break;
            case("University"):
                result = await reqAppByUniversity(searchName);
                break;
            case("Nation"):
                result = await reqAppByNation(searchName);
                break;
            case("Score"):
                result = await reqAppByScore(low_bound, up_bound);
                break;
            case("School"):
                result = await reqAppBySchool(searchName);
                break;
            case("Degree"):
                result = await reqAppByDegree(searchName);
                break;
            default:
                break;
        }
        if (result.status === 0) {
                this.setState({
                    Apps: result.data,
                })
        }
        else if(result.status === 1){
            this.setState({
                Apps: [],
            });
            message.warning(result.msg);
        }
        else{
            message.error(result.msg);
        }
    };

    onChange = (event)=>{
        if(this.state.searchType !== "Score"){
            this.setState({searchName:event.target.value})
        }
        else{
            this.setState({low_bound:event.target.value})
        }
    };

    componentWillMount () {
        this.initColumns()
    }
    componentDidMount() {
        this.getApps()
    }

    render() {
        const {Apps, searchType, searchName, low_bound, up_bound} = this.state;
        const title = (
            <span>
        <span>SearchBy:  </span>
        <Select
            value= {searchType}
            style={{width: 150}}
            onChange={value => this.setState({searchType:value})}
        >
            <Select.Option value='All'>All</Select.Option>
            <Select.Option value='AppName'>AppName</Select.Option>
            <Select.Option value='University'>University</Select.Option>
            <Select.Option value='Nation'>Nation</Select.Option>
            <Select.Option value='Score'>Score</Select.Option>
            <Select.Option value='School'>School</Select.Option>
            <Select.Option value='Degree'>Degree</Select.Option>
        </Select>
        <Input
            placeholder= {searchType==="Score"? "Lower Bound":
            searchType==="All"?"All":
            searchType}
            style={{width: 150, margin: '0 15px'}}
            value={searchType==="Score"?low_bound:searchName}
            onChange={this.onChange}
            disabled={searchType==="All"}
        />
        {(searchType==="Score")&&<span>-</span>}
        {(searchType==="Score")&&<Input
            placeholder={"Upper Bound"}
            style={{width: 150, margin: '0 15px'}}
            value={up_bound}
            onChange={event => this.setState({up_bound:event.target.value})}
        />}
        <Button type='primary' onClick={() => this.getApps()}>Search</Button>
      </span>
        );

        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/app/addupdate')}>
                <Icon type='plus'/>
                modify
            </Button>
        );

        return (
        <Card title={title} extra={this.hasAuthModify()&&extra}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={Apps}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: 5,
                        showQuickJumper: true,
                        onChange: this.getApps
                    }}
                />
            </Card>
        )
    }
}

export default connect(
    state => ({user: state.user}),
)(AppHome)
