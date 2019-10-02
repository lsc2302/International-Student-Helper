import React, {Component} from 'react'
import {reqWeather} from "../../api";
import './index.less'
export default class WeatherCity extends Component {
    state={
        dayPictureUrl:'',
        city:''
    };
    getWeather = ()=>{
        navigator.geolocation.getCurrentPosition(async (position,) => {
            const res = await reqWeather(position.coords.latitude.toFixed(2),
                position.coords.longitude.toFixed(2));
            this.setState({dayPictureUrl:res.dayPictureUrl, city:res.cityName})
        },null,{enableHighAccuracy:true});
    };
    componentDidMount() {
        this.getWeather();
    }
    render(){
        const {dayPictureUrl, city} = this.state;
        return(
            <div>
                <span>{city}</span>
                <img src={dayPictureUrl} className='weather' alt="weather"/>
            </div>
        )
    }
}
