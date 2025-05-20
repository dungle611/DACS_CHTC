import React, { Fragment } from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Pagination, Row, Col } from 'antd'
import { WrapperProduct, WrapperNavbar } from './style'

const TypeProductPage = () => {
    const onChange = () => { }
    return (
        <div style={{ width: '100%', background: '#efefef' }}>
            <div style={{width: '1270px', margin: '0 auto'}}>
                <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                    <WrapperNavbar span={4} >
                        <NavbarComponent></NavbarComponent>
                    </WrapperNavbar>
                    <Col span={20}>
                        <WrapperProduct >
                            <CardComponent></CardComponent>
                            <CardComponent></CardComponent>
                            <CardComponent></CardComponent>
                            <CardComponent></CardComponent>
                            <CardComponent></CardComponent>
                            <CardComponent></CardComponent>
                            <CardComponent></CardComponent>
                            <CardComponent></CardComponent>
                        </WrapperProduct>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <Pagination defaultCurrent={2} total={100} onChange={onChange} />
                        </div>
                    </Col>
                </Row>
            </div>         
        </div>
    )
}

export default TypeProductPage