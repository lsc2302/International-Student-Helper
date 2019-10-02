import React, {PureComponent} from 'react'
import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item;
const Option = Select.Option;


class UserForm extends PureComponent {

  componentWillMount () {
    this.props.setForm(this.props.form)
  }


  render() {

    const {roles, user} = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };

    // const emailValidator = (rule, value, callback)=>{
    //       // if() {
    //       //     // console.log('请输入正确的Email');
    //       //     return false
    //       // }
    //   };

    return (
      <Form {...formItemLayout}>
        <Item label='username'>
          {
            getFieldDecorator('username', {
              initialValue: user.username,
            })(
              <Input placeholder='Please Input Username'/>
            )
          }
        </Item>

        {
          user._id ? null : (
            <Item label='password'>
              {
                getFieldDecorator('password', {
                  initialValue: user.password,
                })(
                  <Input type='password' placeholder='Please Input Password'/>
                )
              }
            </Item>
          )
        }

        <Item label='Phone'>
          {
            getFieldDecorator('phone', {
              initialValue: user.phone,
            })(
              <Input placeholder='Please Input Phone Number'/>
            )
          }
        </Item>
        <Item label='Email'>
          {
            getFieldDecorator('email', {
              initialValue: user.email,
              rules:[{
                  pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
                  message:"invalid Email address!"
              }]
            })(
              <Input placeholder='Please Input Email'/>
            )
          }
        </Item>

        <Item label='Role'>
          {
            getFieldDecorator('role_id', {
              initialValue: user.role_id,
            })(
              <Select>
                {
                  roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UserForm)
