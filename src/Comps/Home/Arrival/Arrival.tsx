import React from 'react'
import { Container,Row ,Col } from "react-bootstrap";
import { Link } from 'react-router';

import './Arrival.css'
const Arrival = () => {
    return (
        <section id='Arrival'>
            <Container>
                <span className="Featured">Featured</span>
                <h2 className="title mt-3">New Arrival</h2>
                <Row>
                    <Col lg={6} md={12} sm={12}>
                        <div className="left">
                            <div className="left-ctn">
                                <h4>PlayStation 5</h4>
                                <p>Black and White version of the PS5 coming out on sale.</p>
                                <Link to="/SignUp" className='text-light' >Shop Now</Link>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                        <div className="right">
                            <div className="right-top">
                                <img className='right-top-photo' src="images/girl.jpg" alt="" />
                                <div className="right-top-ctn">
                                    <h4>Women’s Collections</h4>
                                    <p>Featured woman collections that give you another vibe.</p>
                                    <Link to="/SignUp" className='text-light'>Shop Now</Link>
                                </div>
                            </div>
                            <div className="right-bottom">
                                <Row>
                                    <Col lg={6} md={12} sm={12}>
                                        <div className="right-bottom-left">
                                            <div className="right-bottom-left-ctn">
                                                <h4>Speakers</h4>
                                                <p>Amazon wireless speakers</p>
                                                <Link to="/SignUp" className='text-light'>Shop Now</Link>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={12} sm={12}>
                                        <div className="right-bottom-right">
                                            <div className="right-bottom-right-ctn">
                                                <h4>Perfume</h4>
                                                <p>GUCCI INTENSE OUD EDP</p>
                                                <Link to="/SignUp" className='text-light'>Shop Now</Link>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Arrival