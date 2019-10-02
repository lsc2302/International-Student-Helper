import React, {Component} from 'react'
import {Button, Row, Col} from 'antd'
import './more.less'

export default class More extends Component {
    render() {
        return (

            <Row className='more'>
                <Col span={12} className='left' />
                <Col span={12} className='right'>
                    <h1>401</h1>
                    <h2>You need to login first!</h2>
                    <div>
                        <Button type='primary' onClick={() => this.props.history.replace('/login')}>
                            Login Now!
                        </Button>
                    </div>
                </Col>
            </Row>
        )
    }
}
