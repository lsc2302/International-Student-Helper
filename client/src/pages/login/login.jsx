import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {
    Form,
    Icon,
    Input,
    Button,
    message,
} from 'antd'
import './login.less'
import logo from '../../assets/images/logo.png'
import {connect} from 'react-redux'
import {login} from '../../redux/actions'


class Login extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err){
                const {username, password} = values;
                await this.props.login(username, password);
                const user = this.props.user;
                if(user.status === 1){
                    message.warning(user.errorMsg);
                }
                if(user.status === 2){
                    message.error(user.errorMsg);
                }
            }
            else{
                message.error('login error!');
            }
        })
    };

    render() {
        const user = this.props.user;
        if (user && user._id) {
            return <Redirect to='/'/>
        }
        const form = this.props.form;
        const {getFieldDecorator} = form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>International Student Helper</h1>
                </header>
                <section className='login-content'>
                    <h2>user login</h2>
                    <Form onSubmit={this.handleSubmit} className='login-form'>
                        <Form.Item>{
                            getFieldDecorator('username',{initialValue:'admin'})(
                            <Input
                                prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder='username'
                            />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password')(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type='password'
                                placeholder='password'
                            />)}
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType="submit" className='login-form-button'>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
const WrapLogin = Form.create()(Login);
export default connect(
    state => ({user: state.user}),
    {login}
)(WrapLogin)

