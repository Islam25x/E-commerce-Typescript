import { Container, Row, Col, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../Redux/Store';

import './Footer.css'; 

const Footer = () => {
    const { t } = useTranslation();
    const IsLogin = useAppSelector((state) => state.user.IsLogin);

    return (
        <footer id="footer" className="text-white pt-5">
            <Container>
                <Row>
                    {/* Exclusive Subscribe Section */}
                    <Col md={3} sm={12}>
                        <h5>{t("Exclusive")}</h5>
                        <h6>{t("Subscribe")}</h6>
                        <p>{t("Get 10% off your first order")}</p>
                        <Form>
                            <Form.Control type="email" placeholder={t("Enter your email")} className="mr-2" />
                            <span>→</span>
                        </Form>
                    </Col>

                    {/* Support Section */}
                    <Col md={3} sm={12}>
                        <h5>{t("Support")}</h5>
                        <p style={{ width: "60%" }}>{t("111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.")}</p>
                        <p>exclusive@gmail.com</p>
                        <p>+88015-88888-9999</p>
                    </Col>

                    {/* Account Section */}
                    <Col md={2} sm={12}>
                        <h5>{t("Account")}</h5>
                        <ul className="list-unstyled">
                            <li>
                                {IsLogin ? <a href="/Account" className="text-white">{t("My Account")}</a> : <a href="/SignUp">{t("My Account")}</a>}
                            </li>
                            <li><a href="/Login" className="text-white">{t("Login / Register")}</a></li>
                            <li>
                                {IsLogin ? <a href="/cart" className="text-white">{t("Cart")}</a> : <a href="/SignUp">{t("Cart")}</a>}
                            </li>
                            <li>
                                {IsLogin ? <a href="/Favorite" className="text-white">{t("Wishlist")}</a> : <a href="/SignUp">{t("Wishlist")}</a>}
                            </li>
                            <li><a href="/Error" className="text-white">{t("Shop")}</a></li>
                        </ul>
                    </Col>

                    {/* Quick Links Section */}
                    <Col md={2} sm={12}>
                        <h5>{t("Quick Link")}</h5>
                        <ul className="list-unstyled">
                            <li><a href="/privacy-policy" className="text-white">{t("Privacy Policy")}</a></li>
                            <li><a href="/terms" className="text-white">{t("Terms of Use")}</a></li>
                            <li><a href="/faq" className="text-white">{t("FAQ")}</a></li>
                            <li><a href="/contact" className="text-white">{t("Contact")}</a></li>
                        </ul>
                    </Col>

                    {/* Download App Section */}
                    <Col md={2} sm={12}>
                        <h5>{t("Download App")}</h5>
                        <p>{t("Save $3 with App New User Only")}</p>
                        <div className="d-flex">
                            <a href="/google-play">
                                <img src="images/download.png" alt="Google Play" style={{ width: '100%' }} />
                            </a>
                        </div>
                        <div className="social-icons mt-3">
                            <a href="x" className="text-white mx-3">
                                <i className="fa-brands fa-facebook-f" style={{ color: "#ffffff" }}></i>
                            </a>
                            <a href="x" className="text-white mx-3">
                                <i className="fa-brands fa-twitter" style={{ color: "#ffffff" }}></i>
                            </a>
                            <a href="x" className="text-white mx-3">
                                <i className="fa-brands fa-instagram" style={{ color: "#ffffff" }}></i>
                            </a>
                            <a href="x" className="text-white mx-3">
                                <i className="fa-brands fa-linkedin-in" style={{ color: "#ffffff" }}></i>
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p style={{ marginTop: "5rem", color: '#F9F9F933' }}>&copy; {t("Copyright Rimel 2022. All right reserved")}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
