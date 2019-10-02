import React, {Component} from "react";
import {Table, Button, Icon} from 'antd'
import {reqUniv,reqUpdateUniv} from '../../api/index.js'
import './index.less'

const hotTitle = (
    <span>
    Hot&nbsp;
    <Icon type="fire" theme="twoTone" twoToneColor="#ff0000"/>
  </span>
);


export default class Home extends Component {
    state = {
        univs:[],
        theme:undefined
    };
    async handleClick(event, record){
        const id = record._id;
        if(this.state.theme[id] === ""){
            let cur_theme = this.state.theme;
            cur_theme[id] = "filled" ;
            this.setState({theme:cur_theme});
            record.univ_hot = record.univ_hot+1;
            await reqUpdateUniv(record);
        }
        else{
            let cur_theme = this.state.theme;
            cur_theme[id] = "" ;
            this.setState({theme:cur_theme});
            record.univ_hot = record.univ_hot-1;
            await reqUpdateUniv(record);
        }
    };

    initColumns = () => {
        this.columns=[
            {
                title: 'University',
                dataIndex: 'univ_name',
                width:100,
            },
            {
                title: 'City',
                dataIndex: 'univ_city',
                width:200,
                align:'center',
            },

            {
                title: hotTitle,
                dataIndex: 'univ_hot',
                width:100,
                render:(text,record)=> {
                    const id = record._id;
                    return(
                        <span>
                        <Button type="ghost"
                                style={{border:"none"}}
                                onClick={(event)=>{this.handleClick(event, record)}}
                        >
                            <Icon type='like' theme={this.state.theme?this.state.theme[id]:""} />
                        </Button>
                        {'\u00A0'}
                        {record.univ_hot}
                    </span>)
                }}
                ]
    };

    gethot = async ()=>{
        const result = await reqUniv();
        if(result.status===0){
            this.setState({univs:result.data})
            this.setState({theme:result.data.reduce((pre,item)=>{
                    let obj={};
                    obj[item._id]="";
                    pre = Object.assign(pre,obj);
                    return pre
                },{})});
    }};

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.gethot();
    }

    render(){
        const {univs}=this.state;
        return(
            <div className='home'>
                <div className='content'>
                    <h1>China</h1>
                    <h3>
                        China (Chinese: 中国; pinyin: Zhōngguó; lit. "Central State"),
                        officially the People's Republic of China (PRC),
                        is a country in East Asia and the world's most populous country,
                        with a population of around 1.404 billion.
                        Covering approximately 9,600,000 square kilometers (3,700,000 sq mi),
                        it is the third or fourth largest country by total area.
                        The state exercises jurisdiction over 22 provinces,
                        five autonomous regions, four direct-controlled municipalities (Beijing, Tianjin, Shanghai,
                        and Chongqing), and the special administrative regions of Hong Kong and Macau.
                    </h3>
                    <h1>Chinese Universities</h1>
                    <h3>
                        By May 2017, there were 2,914 colleges and universities, with over 20 million students enrolled in mainland China.
                        More than 6 million Chinese students graduated from university in 2008.
                        The "Project 211" for creating 100 universities began in the mid-1990s,
                        and has merged more than 700 institutions of higher learning into about 300 universities.
                        Corresponding with the merging of many public universities,
                        has been the rapid expansion of the private sector in mainland China since 1999.
                        Although private university enrollments are not clear, one report listed that in 2006 private
                        universities accounted for around 6 percent, or about 1.3 million, of the 20 million students
                        enrolled in formal higher education in China.As of 2018, the country has the world's second
                        highest number of universities in the Shanghai Ranking Consultancy's top 500 universities.
                    </h3>
                    <h1>
                        Chinese University Rankings
                    </h1>
                    <div style={{left:20,position:'relative'}}>
                        <Table
                            className='table'
                            bordered
                            rowKey='_id'
                            columns={this.columns}
                            dataSource={univs}
                            style={{width:400}}
                        >
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}
