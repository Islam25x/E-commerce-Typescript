import { useState, ChangeEvent, FormEvent } from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/LoginSystem/UserSlice";
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import { getProductByName } from "../Redux/CartSlice";
import { useTranslation } from "react-i18next"; // 
import { ClipLoader } from "react-spinners";

const NavHomeAcc: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const FavProducts = useAppSelector((state) => state.favourites.favourites);
  const cartItems = useAppSelector((state) => state.cart.cart);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fetchedProducts = await dispatch(getProductByName(searchQuery));
      setLoading(false);

      if (!fetchedProducts) {
        alert(t("noProductsFound")); // ✅ استبدال النص بترجمة
        return;
      }

      navigate(`/SearchResult/${searchQuery.trim()}`);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/Login");
  };
  if (loading) {
    return (<div className='ClipLoader'>
      <ClipLoader
        color="red"
        size={150}
      />
    </div>)
  }

  return (
    <header id="NavLogSign">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand style={{ fontWeight: "900", width: "33%" }}>
            {t("brandName")}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Link to="/">{t("home")}</Link>
              <Link to="/Contact">{t("contact")}</Link>
              <Link to="/About">{t("about")}</Link>
              <Link to="/SignUp">{t("signUp")}</Link>
            </Nav>
            <Form className="d-flex position-relative" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder={t("searchPlaceholder")}
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
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
                  <h6 className="mt-1">{t("manageAccount")}</h6>
                </NavDropdown.Item>
                <NavDropdown.Item href="/Cart/CheckOut">
                  <i className="me-3 fa-solid fa-bag-shopping"></i>
                  <h6 className="mt-1">{t("myOrder")}</h6>
                </NavDropdown.Item>
                <NavDropdown.Item href="/Favorite">
                  <i className="me-3 fa-regular fa-circle-xmark"></i>
                  <h6 className="mt-1">{t("myCancellations")}</h6>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <i className="me-3 fa-regular fa-star"></i>
                  <h6 className="mt-1">{t("myReviews")}</h6>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogOut}>
                  <i className="me-3 fa-solid fa-arrow-right-from-bracket"></i>
                  <h6 className="mt-1">{t("logout")}</h6>
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
