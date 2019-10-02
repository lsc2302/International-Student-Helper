import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import UnivHome from './home'
import UnivAddUpdate from './add-update'

export default class Univ extends Component {
    render() {
        return (
            <Switch>
                <Route path='/univ' component={UnivHome} exact/>
                <Route path='/univ/addupdate' component={UnivAddUpdate}/>
                <Redirect to='/univ'/>
            </Switch>
        )
    }
}