import React,{Component} from 'react'
import {
    Card,
    Icon,
    Form,
    Input,
    Button,
    message
} from 'antd'
import LinkButton from '../../components/link-button'
import {reqAppByAppName,reqAddApp, reqUpdateApp} from "../../api";


const {Item} = Form;

class AppAddUpdate extends Component{

    submit = () => {
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                let isUpdate;
                let result;
                const app = values;
                const result0 = await reqAppByAppName(app.AppName);
                if(result0.status===0) {
                    isUpdate=true;
                    result = await reqUpdateApp(app);
                }
                else {
                    isUpdate=false;
                    result = await reqAddApp(app);
                }
                console.log(result);
                if (result.status===0) {
                    message.success(`${isUpdate ? 'Update' : 'Add'} Cases Successfully!`);
                    this.props.history.goBack()
                } else {
                    message.error(`${isUpdate ? 'Update' : 'Add'} Cases Failed!`);
                }
            }
        })
    };
    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        };
        const title = (
            <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{fontSize: 20}}/>
        </LinkButton>
        <span>{'Modify Info'}</span>
      </span>
        );
        return(
            <Card title={title}>
                <Form {...formItemLayout} >
                    <Item label="AppName">
                        {
                            getFieldDecorator('AppName', {
                                rules: [
                                    {required: true, message: 'Must Input Applicant Name'},
                                ]
                            })(<Input placeholder='Please Input Applicant Name' />)
                        }
                    </Item>
                    <Item label="University">
                        {
                            getFieldDecorator('University', {
                            })(<Input placeholder="Please Input University Name"
                                      autosize={{ maxRows: 1 }} size='small'/>)
                        }
                    </Item>
                    <Item label="Nation">
                        {
                            getFieldDecorator('Nation', {
                            })(<Input placeholder="Please Input Applicant Nationality"
                                      autosize={{ maxRows: 1 }} size='small'/>)
                        }
                    </Item>
                    <Item label="Score">
                        {
                            getFieldDecorator('Score', {
                            })(<Input placeholder="Please Input Applicant Test Score"
                                      autosize={{ maxRows: 1 }} size='small'/>)
                        }
                    </Item>
                    <Item label="Current School">
                        {
                            getFieldDecorator('School', {
                            })(<Input placeholder="Please Input Applicant Grad School"
                                      autosize={{ maxRows: 1 }} size='small'/>)
                        }
                    </Item>
                    <Item label="Degree">
                        {
                            getFieldDecorator('Degree', {
                            })(<Input placeholder="Please Input Applicant Degree"
                                      autosize={{ maxRows: 1 }} size='small'/>)
                        }
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>submit</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(AppAddUpdate)
