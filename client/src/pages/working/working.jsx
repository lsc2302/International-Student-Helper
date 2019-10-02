import React, {Component} from 'react'
import {Button, Row, Col} from 'antd'
import './working.less'

export default class Working extends Component {
    render() {
        return (
            <Row className='working'>
                <Col span={12} className='left' />
                <Col span={12} className='right'>
                    <h1>404</h1>
                    <h2>Please Wait! We are still working on this page...</h2>
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
