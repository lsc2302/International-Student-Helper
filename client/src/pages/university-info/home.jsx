import React,{Component} from 'react'
import {
    Card,
    Select,
    Button,
    Icon,
    Descriptions,
    Pagination,
    AutoComplete,
    Rate,
    Row,
    message,
    InputNumber
} from 'antd'
import GoogleMap from '../../components/googlemap'
import {reqUnivByRank,reqUnivByName, reqUnivNum} from '../../api/index.js'
import {univConfig} from '../../config/univConfig.js'
import {connect} from 'react-redux'

const BASE_IMG_URL = 'http://localhost:5000/upload/';

class UnivHome extends Component{
    state={
        univ:{},
        searchName:'',
        searchType:'Name',
        cur_page:1,
        univ_num:0
    };

    hasAuthModify = () => {
        if (!this.props.user||!this.props.user._id){
            return false;
        }
        const username = this.props.user.username;
        if(username === 'admin')
            return true;
        const menus = this.props.user.role.menus;
        return !!(menus.indexOf('/univ/modify') !== -1);
    };

    getUniv = async (univ_search) =>{
        let result;
        let num_res = await reqUnivNum();
        if (num_res.status === 0){
            this.setState({univ_num:num_res.count})
        }
        if (isNaN(univ_search)){
            result = await reqUnivByName(univ_search)
        }
        else{
            result = await reqUnivByRank(univ_search);
        }
        if (result.status === 0) {
            const univ = result.data;
            this.setState({univ:univ});
            this.setState({cur_page:univ.univ_rank})
        }
        else if (result.status === 1){
            message.warning(result.msg)
        }
        else{
            message.error(result.msg)
        }
    };

    onChange = async (pageNum)=>{
        let result;
        result = await reqUnivByRank(pageNum);
        if (result.status === 0) {
            const univ = result.data;
            this.setState({univ:univ})
            this.setState({cur_page:univ.univ_rank})
        }

    };

    componentWillMount(){
    this.getUniv('Peking University');
}

    render(){
        const {univ, searchName, searchType, cur_page, univ_num} = this.state;
        const imgs = univ.univ_imgs;
        const title = (<span>
        <span>SearchBy:    </span>
        <Select
            value= {searchType}
            style={{width: 150}}
            onChange={value => this.setState({searchType:value})}
        >
          <Select.Option value='Name'>Name</Select.Option>
          <Select.Option value='Rank'>Rank</Select.Option>
        </Select>
        {(searchType==='Name')&&<AutoComplete
            style={{width: 150, margin: '0 15px'}}
            dataSource={univConfig}
            placeholder={'Name'}
            filterOption={(inputValue, option) =>
                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            onChange={value => this.setState({searchName:value})}
        />}
        {(searchType==='Rank')&&<InputNumber
            style={{width: 150, margin: '0 15px'}}
            placeholder={'Rank'}
            onChange={value => this.setState({searchName:value})}
        />
        }
        <Button type='primary' onClick={()=>this.getUniv(searchName)}>search</Button>
      </span>);
        const extra =(
            <Button type='primary' onClick={() => this.props.history.push('/univ/addupdate')}>
                <Icon type='plus'/>
                modify
            </Button>
        );
        return(
            <div>
                <Card title={title} extra={this.hasAuthModify()&&extra} bordered={false} className='card'>
                    <Descriptions title='University Info' layout='horizontal' bordered>
                    <Descriptions.Item label="Name" >
                        {univ.univ_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Rank(Chinese Edu Depart)" >
                        {univ.univ_rank}
                    </Descriptions.Item>
                    <Descriptions.Item label="QS Rank" >
                        <span>{univ.univ_qs_rank}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Stars" >
                        <Rate  value={univ.univ_stars} count={8}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="City" >
                        {univ.univ_city}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address" >
                        <span>{univ.univ_address}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Strength" span={3} >
                        <span>{univ.univ_strength}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Website" span={3}>
                        {univ.univ_web}
                    </Descriptions.Item>
                    <Descriptions.Item label="Campus Image" span={3}>
                    { imgs&&
                        <span>
                      {
                          imgs.map(img => (
                              <img
                                  key={img}
                                  src={BASE_IMG_URL + img}
                                  className="univ-img"
                                  alt="img"
                                  height={150}
                                  width={150}
                              />
                          ))
                      }
                    </span>
                    }
                    </Descriptions.Item>
                    <Descriptions.Item label='campus Location' span={3}>
                    <Row style={{height:300}}>
                    {(!isNaN(univ.univ_lat))&&
                    <GoogleMap
                        center={{lat:univ.univ_lat, lng:univ.univ_lng}}
                        zoom={17}
                        desc={univ.univ_name}/>}
                    </Row>
                    </Descriptions.Item>
                    <Descriptions.Item label="Introduction" >
                    <span dangerouslySetInnerHTML={{__html: univ.univ_intro}}>
                    </span>
                    </Descriptions.Item>
                    </Descriptions>
                </Card>
                <Pagination
                    showQuickJumper
                    onChange={this.onChange}
                    current={cur_page}
                    pageSize={1}
                    total={univ_num}
                    style={{position:'relative',bottom:5, right:-750}}/>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
)(UnivHome)
