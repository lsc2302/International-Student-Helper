import React, { Component } from 'react';

import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {Card} from "antd";

class Bar extends Component {
    componentDidMount() {
        var myChart = echarts.init(document.getElementById('bar'));
        myChart.setOption({
            title: {
                text: 'Job occupation favored by Chinese University Students',
                x: 'center'
            },
            tooltip: {
                formatter: "{a} <br/>{b} :({c}%)"
            },
            xAxis: {
                data: ["IT","Administration","Marketing","Finance","Design","Education","Business","Electronics"],
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize:'10'
                    }
                },
            },
            yAxis: {},
            series: [{
                name: 'Ratio',
                type: 'bar',
                data: [37,18,17,15,5,4,3,1],
                barWidth:50,
            }]
        });
    }
    render() {
        return (
            <Card title='Bar chart'>
                <div id="bar" style={{ align:"center", width: 1000, height: 600 }} />
            </Card>
        );
    }
}

export default Bar;