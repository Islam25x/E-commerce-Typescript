import { Container, Row, Col, Form } from 'react-bootstrap';
import './Footer.css'; 
import { useAppSelector } from '../Redux/Store';

const Footer = () => {
        
    const IsLogin = useAppSelector((state)=> state.user.IsLogin)  
    return (
        <footer id="footer" className=" text-white pt-5">
        <Container>
            <Row>
            {/* Exclusive Subscribe Section */}
            <Col md={3} sm={12}>
                <h5>Exclusive</h5>
                <h6>Subscribe</h6>
                <p>Get 10% off your first order</p>
                <Form>
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className="mr-2"
                />
                <span>→</span>
                </Form>
            </Col>

            {/* Support Section */}
            <Col md={3} sm={12}>
                <h5>Support</h5>
                <p style={{width:"60%"}}>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
                <p>exclusive@gmail.com</p>
                <p>+88015-88888-9999</p>
            </Col>

            {/* Account Section */}
            <Col md={2} sm={12}>
                <h5>Account</h5>
                <ul className="list-unstyled">
                <li>
                    {
                        IsLogin ? 
                        <a href="/Account" className="text-white">My Account</a>:
                        <a href="/SignUp">My Account</a>
                    }
                </li>
                <li><a href="/Login" className="text-white">Login / Register</a></li>
                <li>
                    {
                        IsLogin ? 
                        <a href="/cart" className="text-white">Cart</a>:
                        <a href="/SignUp">Cart</a>
                    }
                </li>
                <li>
                    {
                        IsLogin ? 
                        <a href="/Favorite" className="text-white">Wishlist</a>:
                        <a href="/SignUp">Wishlist</a>
                    }
                </li>
                <li>
                    <a href="/Error" className="text-white">Shop</a></li>
                </ul>
            </Col>

            {/* Quick Links Section */}
            <Col md={2} sm={12}>
                <h5>Quick Link</h5>
                <ul className="list-unstyled">
                <li><a href="/privacy-policy" className="text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="text-white">Terms of Use</a></li>
                <li><a href="/faq" className="text-white">FAQ</a></li>
                <li><a href="/contact" className="text-white">Contact</a></li>
                </ul>
            </Col>

            {/* Download App Section */}
            <Col md={2} sm={12}>
                <h5>Download App</h5>
                <p>Save $3 with App New User Only</p>
                <div className="d-flex">
                <a href="/google-play">
                    <img src="images/download.png" alt="Google Play" style={{width:'100%'}} />
                </a>
                </div>
                <div className="social-icons mt-3">
                    <a href="x" className="text-white mx-3">
                        <i className="fa-brands fa-facebook-f" style={{color:"#ffffff"}}></i>
                    </a>
                    <a href="x" className="text-white mx-3">
                        <i className="fa-brands fa-twitter" style={{color:"#ffffff"}}></i>
                    </a>
                    <a href="x" className="text-white mx-3">
                        <i className="fa-brands fa-instagram" style={{color:"#ffffff"}}></i>
                    </a>
                    <a href="x" className="text-white mx-3">
                        <i className="fa-brands fa-linkedin-in" style={{color:"#ffffff"}}></i>
                    </a>
                </div>
            </Col>
            </Row>
            <Row>
            <Col className="text-center">
                <p style={{marginTop:"5rem",color:'#F9F9F933'}}>&copy; Copyright Rimel 2022. All right reserved</p>
            </Col>
            </Row>
        </Container>
        </footer>
    );
};

export default Footer;
