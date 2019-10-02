import React, {Component} from 'react';
import echarts from 'echarts';
import 'echarts/map/js/china';
import geoJson from 'echarts/map/json/china.json';
import {provienceData} from "./distribution";

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        Map.initalECharts();
    }
    static initalECharts() {
        echarts.registerMap('china', geoJson);
        const myChart = echarts.init(document.getElementById('mainMap'));
        myChart.setOption({
            dataRange:{
                color:['red','white'],
                text:['high','low'],
                min: 0,
                max: 26,
                left:100
            },
            tooltip: {
                show: true,
                formatter: function(a){
                    return `${a.data.name}<br/>${a.data.en_name}<br/>${a.data.value}`
                }
                ,
                backgroundColor:"#ff7f50",
                textStyle:{color:"#fff"}
            },
            series: [
                {
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    zoom: 1.2,
                    tooltip: {
                        show: true,
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: .5,
                            borderColor: '#fff',
                            label:{show:false}
                        },
                        emphasis:{
                            label:{show:false}
                        }
                    },
                    data: provienceData,

                }
            ],
        })
    }
    render() {
        return (
            <div>
                <h1 style={{position:"relative",fontSize:30, left:"30%"}}>China Project '211' Universities Density Map</h1>
                <div className="App">
                    <div id="mainMap" style={{position:'relative',width:'70vm',height:'70vh'}} />
                </div>
            </div>
        );
    }
}
