import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd';
import {connect} from 'react-redux'

import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'
import {setHeadTitle} from '../../redux/actions'

const SubMenu = Menu.SubMenu;

class LeftNav extends Component {
    hasAuth = (item) => {
        const {key, isPublic, ForVisitor} = item;
        if(!this.props.user|| !this.props.user._id)
            return isPublic||ForVisitor;
        const username = this.props.user.username;
        if(username === 'admin'&&!ForVisitor)
            return true;
        const menus = this.props.user.role.menus;
        if(isPublic || menus.indexOf(key)!==-1) {
            return true
        } else if(item.children){
            return !!item.children.find(child =>  menus.indexOf(child.key)!==-1)
        }

        return false
    };

    getMenuNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            if (this.hasAuth(item)) {
                if(!item.children) {
                    pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                } else {
                    pre.push((
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </span>
                            }
                        >
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    ))
                }
            }

            return pre
        }, [])
    };

    render() {
        let path = this.props.location.pathname;
        this.menuNodes = this.getMenuNodes(menuList);
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>International Student Helper</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                >

                    {
                        this.menuNodes
                    }

                </Menu>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {setHeadTitle}
)(withRouter(LeftNav))
