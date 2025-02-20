import { useState } from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../Redux/LoginSystem/UserSlice";
import { useAppDispatch, useAppSelector } from '../Redux/Store'
import { useNavigate } from "react-router-dom";
import { getProductByName } from "../Redux/CartSlice";

const NavHomeAcc = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const FavProducts = useAppSelector((state) => state.favourites.favourites);


  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission (search)
const [loading, setLoading] = useState(false);

const dispatch = useAppDispatch()

const handleSearchSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  // Search for products by name
  const fetchedProducts = dispatch(getProductByName(searchQuery));

  setLoading(false);
  
  if (fetchedProducts.length === 0) {
    alert("No products found!");
    return;
  }

  navigate(`/SearchResult/${searchQuery.trim()}`);
};


<button type="submit" disabled={loading}>
  {loading ? "Searching..." : <i className="Search-i fa-solid fa-magnifying-glass"></i>}
</button>

  const cartItems = useAppSelector((state)=> state.cart.cart)

  const handleLogOut = ()=>{
    dispatch(logout());
    navigate('/Login')
  }

  return (
    <header id="NavLogSign">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand style={{ fontWeight: "900", width: "33%" }}>
            Exclusive
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/">Home</Link>
              <Link to="/Contact">Contact</Link>
              <Link to="/About">About</Link>
              <Link to="/SignUp">Sign Up</Link>
            </Nav>
            <Form
              className="d-flex position-relative"
              onSubmit={handleSearchSubmit}
            >
              <Form.Control
                type="search"
                placeholder="What are you looking for?"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <i className="Search-i fa-solid fa-magnifying-glass"></i>
              <Link to="/Favorite">
                <span>{FavProducts.length}</span>
                <i className="fa-regular fa-heart"></i>
              </Link>
              <Link className="mx-3" to="/Cart">
                <span>{cartItems.length}</span>
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
              <div className="profile-photo">
                <i className="def-user fa-regular fa-user"></i>
              </div>
              <NavDropdown className="ms-4" title="." id="basic-nav-dropdown">
                <NavDropdown.Item className="d-flex" href="/Account">
                  <i className="def-user fa-regular fa-user me-3"></i>
                  <h6 className="mt-1">Manage My Account</h6>
                </NavDropdown.Item>
                <NavDropdown.Item href="/Cart/CheckOut">
                  <i className="me-3 fa-solid fa-bag-shopping"></i>
                  <h6 className="mt-1">My Order</h6>
                </NavDropdown.Item>
                <NavDropdown.Item href="/Favorite">
                  <i className="me-3 fa-regular fa-circle-xmark"></i>
                  <h6 className="mt-1">My Cancellations</h6>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <i className="me-3 fa-regular fa-star"></i>
                  <h6 className="mt-1">My Reviews</h6>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogOut}>
                  <i className="me-3 fa-solid fa-arrow-right-from-bracket"></i>
                  <h6 className="mt-1">Logout</h6>
                </NavDropdown.Item>
              </NavDropdown>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavHomeAcc;
