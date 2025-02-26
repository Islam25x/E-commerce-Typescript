import { useState, ChangeEvent, FormEvent } from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./NavLogSign.css";

const NavHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/SignUp`);
      console.log(searchQuery);
    }
  };

  return (
    <header id="NavLogSign">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#" style={{ fontWeight: "900", width: "33%" }}>
            {t("Exclusive")}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Link to="/">{t("Home")}</Link>
              <Link to="/Contact">{t("Contact")}</Link>
              <Link to="/About">{t("About")}</Link>
              <Link to="/SignUp">{t("Sign Up")}</Link>
            </Nav>
            <Form className="d-flex position-relative" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder={t("What are you looking for?")}
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <i className="Search-i fa-solid fa-magnifying-glass" style={{ position: "absolute", right: "5.6rem" }}></i>
              <Link to="/SignUp" className="mx-3">
                <i className="fa-regular fa-heart"></i>
              </Link>
              <Link to="/SignUp">
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
