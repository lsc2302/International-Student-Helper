import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'

class GoogleMap extends Component{
    static defaultProps = {
        center:{
            lat:39.981727,
            lng:116.305869
        },
        zoom:17,
        desc:'Peking University'
    };

    state={
        activeMarker:null,
        showingInfoWindow:false,
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true
        });

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.center.lat !== this.props.center.lat)||(nextProps.center.lng !== this.props.center.lng)
            || (nextState.showingInfoWindow !== this.state.showingInfoWindow) ||
            (nextState.activeMarker !== this.state.activeMarker)
    }

    render() {
        return (
            <Map google={this.props.google}
                 initialCenter={this.props.center}
                 center = {this.props.center}
                 zoom={this.props.zoom}
                 className='map'
                 style={{width:500, height: 300,position: 'absolute'}}
            >
                <Marker onClick={this.onMarkerClick} name={this.props.desc} position={this.props.center}/>
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                >
                    <div>
                        <h3>{this.props.desc}</h3>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyADVm9JzybvR2uJSTqJM6tQNPna9xY8nFo"
})(GoogleMap)