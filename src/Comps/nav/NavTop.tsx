import React from 'react'
import { Container } from 'react-bootstrap';
import './NavTop.css'

const NavTop = () => {
    return (
        <header id='NavTop'>
            <Container>
                    <div className='d-flex justify-content-between'>
                        <div></div>
                        <span >
                            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
                            <a href="s">ShopNow</a>
                        </span>
                        <select>
                            <option value="en">English</option>
                            <option value="ar">العربية</option>
                        </select>
                    </div>
            </Container>
        </header>
    );
};
export default NavTop