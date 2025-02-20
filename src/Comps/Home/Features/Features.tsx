import React from 'react'
import { Container,Row,Col} from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";

import './Features.css'

const Features = () => {
    return (
        <section id='features'>
            <Container>
                <Row>
                    <Col lg={4} md={4} sm={12}>
                        <div className="features-ctn text-center">
                            <div className="icon">
                                <i className="fa-solid fa-truck-fast"></i>
                            </div>
                            <h6>FREE AND FAST DELIVERY</h6>
                            <p>Free delivery for all orders over $140</p>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                        <div className="features-ctn text-center">
                            <div className="icon">
                                <i className="fa-solid fa-headphones"></i>
                            </div>
                            <h6>24/7 CUSTOMER SERVICE</h6>
                            <p>Friendly 24/7 customer support</p>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                        <div className="features-ctn text-center">
                            <div className="icon">
                                <i className="fa-solid fa-clipboard-check"></i>
                            </div>
                            <h6>MONEY BACK GUARANTEE</h6>
                            <p>We return money within 30 days</p>
                        </div>
                    </Col>
                </Row>
                <ScrollToTop/>
            </Container>
        </section>
    )
}

export default Features