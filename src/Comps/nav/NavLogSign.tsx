import { Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';
import './NavLogSign.css';

const NavLogSign = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        document.getElementById("NavLogSign")?.setAttribute("dir", i18n.language === "ar" ? "ltr" : "ltr");
    }, [i18n.language]);

    return (
        <header id='NavLogSign'>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="#" style={{ fontWeight: '900', width: '33%' }}>
                        {t('Exclusive')}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Link to="/">{t('Home')}</Link>
                            <Link to="/Contact">{t('Contact')}</Link>
                            <Link to="/About">{t('About')}</Link>
                            <Link to="/SignUp">{t('Sign Up')}</Link>
                        </Nav>
                        <Form className="d-flex position-relative">
                            <Form.Control
                                type="search"
                                placeholder={t('What are you looking for?')}
                                className="me-2"
                                aria-label="Search"
                            />
                            <i className="fa-solid fa-magnifying-glass" style={{
                                color: "black",
                                backgroundColor: '#f5f5f5',
                                padding: '0.3rem',
                                position: 'absolute',
                                right: '8%',
                                top: '0.4rem'
                            }}></i>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default NavLogSign;
