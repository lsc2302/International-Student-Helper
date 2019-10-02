import React, {Component} from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'

export default class Pie extends Component {

    getOption = () => {
        return {
            title : {
                text: 'International Student Sources',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} :{c}({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['Asia','Europe','Africa','America','Oceania']
            },
            series : [
                {
                    name: 'International Student Sources',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:264976, name:'Asia'},
                        {value:71319, name:'Europe'},
                        {value:61594, name:'Africa'},
                        {value:38077, name:'America'},
                        {value:6807, name:'Oceania'},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

    }

    render() {
        return (
            <div>
                <Card title='Pie chart'>
                    <ReactEcharts option={this.getOption()} style={{height: 500}}/>
                </Card>
            </div>
        )
    }
}
