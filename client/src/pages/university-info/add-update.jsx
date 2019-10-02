import React,{Component} from 'react'
import {
    Card,
    Icon,
    Form,
    Input,
    InputNumber,
    Row,
    Col,
    Button,
    message
} from 'antd'
import LinkButton from '../../components/link-button'
import {reqAddUniv,reqUpdateUniv, reqUnivByName} from "../../api";
import RichTextEditor from './rich-text-editor.jsx'
import PicturesWall from './picture-wall.jsx'


const {Item} = Form;
const { TextArea } = Input;

class UnivAddUpdate extends Component{

    constructor (props) {
        super(props);
        this.pw = React.createRef();
        this.editor = React.createRef();
    }

    submit = () => {
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                let isUpdate;
                let result;
                const {univ_name, univ_address,
                    univ_rank, univ_web,univ_lat,univ_lng,
                    univ_stars, univ_city, univ_strength, univ_qs_rank} = values;
                let univ_imgs = this.pw.current.getImgs();
                if (univ_imgs.length === 0)
                    univ_imgs=undefined;
                let univ_intro = this.editor.current.getIntro();
                const univ = {univ_name, univ_address,univ_rank,
                    univ_web, univ_imgs,univ_intro,univ_lat,univ_lng,univ_stars, univ_city, univ_strength, univ_qs_rank};
                const result0 = await reqUnivByName(univ_name);
                if(result0.status===0) {
                    isUpdate=true;
                    result = await reqUpdateUniv(univ);
                }
                else {
                    isUpdate=false;
                    result = await reqAddUniv(univ);
                }
                if (result.status===0) {
                    message.success(`${isUpdate ? 'Update' : 'Add'}Successfully!`);
                    this.props.history.goBack()
                }
                else {
                    message.error(`${isUpdate ? 'Update' : 'Add'}Failed!`);
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
                    <Item label="Name">
                        {
                            getFieldDecorator('univ_name', {
                                rules: [
                                    {required: true, message: 'Must Input University Name'},
                                ]
                            })(<Input placeholder='Please Input University Name' />)
                        }
                    </Item>
                    <Item label="Rank(CH)">
                        {
                            getFieldDecorator('univ_rank', {
                                rules: [
                                    {required: true, message: 'Must Input University Rank'},
                                ]
                            })(<InputNumber/>)
                        }
                    </Item>
                    <Item label="QS Rank">
                        {
                            getFieldDecorator('univ_qs_rank', {
                            })(<InputNumber/>)
                        }
                    </Item>
                    <Item label="Stars">
                        {
                            getFieldDecorator('univ_stars', {
                            })(<InputNumber/>)
                        }
                    </Item>
                    <Item label="City">
                        {
                            getFieldDecorator('univ_city', {
                            })(<TextArea placeholder="Please Input University Address"
                                         autosize={{ maxRows: 1 }} size='small'/>)
                        }
                    </Item>
                    <Item label="Address">
                        {
                            getFieldDecorator('univ_address', {
                            })(<TextArea placeholder="Please Input University Address"
                                         autosize={{ minRows: 2, maxRows: 4 }} size='small'/>)
                        }
                    </Item>
                    <Item label="Strength">
                        {
                            getFieldDecorator('univ_strength', {
                            })(<TextArea placeholder="Please Input University Address"
                                         autosize={{ minRows: 2, maxRows: 4 }} size='small'/>)
                        }
                    </Item>
                    <Item label='Coordinate'>
                        {getFieldDecorator('univ_coord', {
                        })(<Row gutter={30}>
                            <Col span={8}>
                                <Item >
                                    {
                                        getFieldDecorator('univ_lat', {
                                        })(<Input placeholder={'latitude'}/>)
                                    }
                                </Item>
                            </Col>
                            <Col span={8}>
                                <Item>
                                    {
                                        getFieldDecorator('univ_lng', {
                                        })(<Input placeholder={'longitude'}/>)
                                    }
                                </Item>
                            </Col>
                        </Row>)}
                    </Item>
                    <Item label="Website">

                        {
                            getFieldDecorator('univ_web', {
                            })(<Input placeholder='Please Input University Website'/>)
                        }
                    </Item>
                    <Item label="Campus Image">
                        <PicturesWall ref={this.pw} />
                    </Item>
                    <Item label="Introduction" labelCol={{span: 2}} wrapperCol={{span: 20}}>
                        <RichTextEditor ref={this.editor}/>
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>submit</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(UnivAddUpdate)
