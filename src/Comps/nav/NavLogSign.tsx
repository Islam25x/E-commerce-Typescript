import { Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router'
import './NavLogSign.css'

const NavLogSign = () => {

    return (
        <header id='NavLogSign'>
            <Navbar expand="lg" >
                <Container>
                    <Navbar.Brand href="#" style={{ fontWeight: '900', width: '33%' }}>Exclusive</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link to="/">Home</Link>
                            <Link to="/Contact">Contact</Link>
                            <Link to="/About">About</Link>
                            <Link to="/SignUp">Sign Up</Link>
                        </Nav>
                        <Form className="d-flex position-relative">
                            <Form.Control
                                type="search"
                                placeholder="What are you looking for?"
                                className="me-2"
                                aria-label="Search"
                            />
                            <i className="fa-solid fa-magnifying-glass" style={{ color: "black" }}></i>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default NavLogSign