import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/index.jsx'
import NotFound from '../not-found/not-found.jsx'
import More from '../more/more.jsx'
import Working from '../working/working.jsx'
import Univ from '../university-info/univ.jsx'
import App from '../applicants-info/apps.jsx'
import Role from '../role/role.jsx'
import User from "../user/user.jsx"
import Bar from '../charts/bar.jsx'
import Pie from '../charts/pie.jsx'
import Map from '../charts/map.jsx'
import {connect} from 'react-redux'

import { Layout } from 'antd'
const { Footer, Sider, Content } = Layout;

class Admin extends Component {
    render(){
        const user = this.props.user;
        let user_login=false;
        let admin_login = false;
        if(user && user._id) {
            user_login=true;
            if(user.username === "admin")
                admin_login=true;
        }
        return(
        <Layout style={{minHeight: '100%'}}>
            <Sider width={250}>
                <LeftNav />
            </Sider>
                <Layout className='layout' >
                <Header>Header</Header>
                <Content className='content' style={{margin: 20, backgroundColor: '#fff'}}>
                    <Switch>
                        <Redirect from='/' exact to='/home'/>
                        <Route path='/home' component={Home}/>
                        <Route path='/univ' component={Univ}/>
                        <Route path='/more' component={More}/>
                        {(user_login)&&<Route path='/app' component={App}/>}
                        {(admin_login)&&<Route path='/role' component={Role}/>}
                        {(user_login)&&<Route path='/user' component={User}/>}
                        {(user_login)&&<Route path='/charts/bar' component={Bar} />}
                        {(user_login)&&<Route path='/charts/line' component={Working} />}
                        {(user_login)&&<Route path='/charts/pie' component={Pie} />}
                        {(user_login)&&<Route path='/charts/map' component={Map}/>}
                        <Route component={NotFound}/>
                    </Switch>
                </Content>
                <Footer style={{textAlign: 'center', color: '#cccccc'}}>Contact us @shcliu96@gmail.com</Footer>
            </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({user: state.user})
)(Admin)
