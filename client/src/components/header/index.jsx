import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import WeatherCity from '../weather-city/index.jsx'
import {formateDate} from '../../utils/dateUtils'
import {Modal, Row,Col} from "antd";
import './index.less'
import LinkButton from '../link-button'
import {logout} from '../../redux/actions'
import {connect} from 'react-redux'

class Header extends Component {
    state={
        currentTime:formateDate(Date.now()),
    };
    getTime=()=>{
        this.timer = setInterval(()=>{
            const curTime = formateDate(Date.now());
            this.setState({currentTime:curTime})
        },1000)
    };
    logout = () => {
        Modal.confirm({
            content:"Do you want to exit?",
            onOk: () => {
                this.props.logout();
                this.props.history.replace('/')
            }
        })
    };
    componentDidMount() {
        this.getTime();
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render(){
        const {currentTime} = this.state;
        const username = this.props.user.username;
        return(
            <div className='header'>
                <div className='header-top'>
                    <span>Welcome {username}</span>
                    {username&&<LinkButton onClick={this.logout}>log out</LinkButton>}
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-right">
                        <Row >
                            <Col span={3} offset={17}>
                                <span>{currentTime}</span>
                            </Col>
                            <Col >
                                <WeatherCity/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({headTitle: state.headTitle, user: state.user}),
    {logout}
)(withRouter(Header))
