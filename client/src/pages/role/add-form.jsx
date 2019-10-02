import React, {Component} from 'react'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item;

class AddForm extends Component {

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };

    return (
      <Form>
        <Item label='RoleName' {...formItemLayout}>
          {
            getFieldDecorator('roleName', {
              initialValue: '',
              rules: [
                {required: true, message: 'Must Input Role Name'}
              ]
            })(
              <Input placeholder='Role Name'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)
