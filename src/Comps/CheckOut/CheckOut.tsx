import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAppSelector } from "../Redux/Store";
import { Link } from "react-router";
import Convert from "../functions/FormatCurrncy";

import "./CheckOut.css";

const CheckOut: React.FC = () => {
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const cartProducts = useAppSelector((state) => state.cart.cart);

  // State to keep track of selected payment method
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  // Handle radio button change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(e.target.value);
  };

  return (
    <section id="CheckOut">
      <Container>
        <p className="Path">
          Home / Cart / <span className="text-dark">CheckOut</span>
        </p>
        <h1 className="mb-5">Billing Details</h1>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div className="left">
              {[
                "First Name",
                "Company Name",
                "Street Address",
                "Apartment, floor, etc. (optional)",
                "Town/City",
                "Phone Number",
                "Email Address",
              ].map((label, index) => (
                <div className="inp-filed" style={{ marginBottom: "1.6rem" }} key={index}>
                  <p>
                    {label} {index !== 1 && <span className="text-danger">*</span>}
                  </p>
                  <input type="text" />
                </div>
              ))}
              <input type="checkbox" className="check" />
              <label className="ms-2">
                Save this information for faster check-out next time
              </label>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <div className="right">
              <div className="right-top">
                <div className="right-cart">
                  {cartProducts &&
                    cartProducts.map((cartItem) => (
                      <div
                        className="cart-products d-flex justify-content-between mb-4"
                        key={cartItem.id}
                      >
                        <div className="photo d-flex" style={{ margin: "auto 0" }}>
                          <img
                            src={cartItem.image}
                            alt={cartItem.name}
                            className="cartItem-image"
                          />
                          <h6 style={{ margin: "auto 0" }}>
                            {cartItem.name.split(" ").slice(0, 2).join(" ")}
                          </h6>
                        </div>
                        <p>{Convert(cartItem.new_price * cartItem.quantity)}</p>
                      </div>
                    ))}
                </div>
                <div className="right-price">
                  {["Subtotal", "Shipping", "Total"].map((label, index) => (
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginBottom: "-1rem" }}
                      key={index}
                    >
                      <p>{label}:</p>
                      <p>{label === "Shipping" ? "free" : Convert(totalPrice)}</p>
                    </div>
                  ))}
                  <hr />
                </div>
                <div className="pay d-flex justify-content-between">
                  <form>
                    {["Bank", "Cash on delivery"].map((method) => (
                      <div className="mt-4" key={method}>
                        <input
                          type="radio"
                          id={method.toLowerCase()}
                          name="payment"
                          value={method}
                          checked={selectedPayment === method}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor={method.toLowerCase()}
                          className="ms-3"
                          style={{ fontSize: "18px" }}
                        >
                          {method}
                        </label>
                      </div>
                    ))}
                  </form>
                </div>
              </div>
              <div className="Coupon mt-3">
                <input type="text" placeholder="Coupon Code" />
                <button className="Apply">Apply Coupon</button>
              </div>
              <Link to='/Error'>
                <button className="Order mt-3" style={{ marginLeft: "0rem" }}>
                  Place Order
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CheckOut;
