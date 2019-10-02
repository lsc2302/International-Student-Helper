import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import AppHome from './home'
import AppAddUpdate from './add-update'

export default class Univ extends Component {
    render() {
        return (
            <Switch>
                <Route path='/app' component={AppHome} exact/>
                <Route path='/app/addupdate' component={AppAddUpdate}/>
                <Redirect to='/app'/>
            </Switch>
        )
    }
}