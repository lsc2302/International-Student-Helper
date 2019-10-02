import React, {Component} from 'react'
import {Button, Row, Col} from 'antd'
import './not-found.less'

export default class NotFound extends Component {
    render() {
        return (

            <Row className='not-found'>
                <Col span={12} className='left' />
                <Col span={12} className='right'>
                    <h1>404</h1>
                    <h2>Sorry, the page you want to visit does not exist!</h2>
                    <div>
                        <Button type='primary' onClick={() => this.props.history.replace('/home')}>
                            Back to Home
                        </Button>
                    </div>
                </Col>
            </Row>
        )
    }
}