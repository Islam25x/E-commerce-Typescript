import React from 'react'
import { Container ,Row ,Col } from 'react-bootstrap'

import './Achievement.css'
const Achievement = () => {
    return (
        <section id='Achievement'>
            <Container>
                <Row>
                    <Col lg={3} md={6} sm={12}>
                        <div className="Achievement-ctn text-center">
                            <div className="icon">
                            <i className="fa-solid fa-shop"></i>
                            </div>
                            <h3 style={{fontWeight:'700'}}>10.5k</h3>
                            <p>Sallers active our site</p>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <div className="Achievement-ctn text-center">
                            <div className="icon">
                            <i className="fa-solid fa-dollar-sign"></i>
                            </div>
                            <h3 style={{fontWeight:'700'}}>33k</h3>
                            <p>Mopnthly Produduct Sale</p>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <div className="Achievement-ctn text-center">
                            <div className="icon">
                            <i className="fa-solid fa-gift"></i>
                            </div>
                            <h3 style={{fontWeight:'700'}}>45.5k</h3>
                            <p>Customer active in our site</p>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <div className="Achievement-ctn text-center">
                            <div className="icon">
                            <i className="fa-solid fa-sack-dollar"></i>
                            </div>
                            <h3 style={{fontWeight:'700'}}>25k</h3>
                            <p>Anual gross sale in our site</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Achievement