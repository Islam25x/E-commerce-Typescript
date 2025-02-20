import React, { useState } from 'react';
import { Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../Redux/LoginSystem/UserSlice';
import { useAppDispatch, useAppSelector } from "../Redux/Store";

import './NavLogSign.css';

const NavHome = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  // const navigate = useNavigate();

  // // Handle search input change
  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // // Handle form submission (search)
  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   // Navigate to product description page with search query
  //   if (searchQuery) {
  //     navigate(`/SignUp`);
  //     console.log(searchQuery);
      
  //   }
  // };

  return (
    <header id='NavLogSign'>
      <Navbar expand="lg">
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
            {/* onSubmit={handleSearchSubmit} */}
            <Form className="d-flex position-relative" >
              <Form.Control
                type="search"
                placeholder="What are you looking for?"
                className="me-2"
                aria-label="Search"
                // value={searchQuery}
                // onChange={handleSearchChange}
              />
              <i className="Search-i fa-solid fa-magnifying-glass" style={{ position: 'absolute', right: '5.6rem' }}></i>
              <Link to='/SignUp' className='mx-3'>
                <i className="fa-regular fa-heart"></i>
              </Link>
              <Link to='/SignUp'>
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavHome;
