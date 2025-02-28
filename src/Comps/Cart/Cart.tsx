import { Container, Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import { Link } from "react-router-dom";
import { removeFromCart, increaseProduct, decreaseProduct } from "../Redux/CartSlice";
import Convert from "../functions/FormatCurrncy";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import "./Cart.css";

const Cart = () => {
  const { t,i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const Cart = useAppSelector((state) => state.cart.cart);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    document.querySelector(".Path")?.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  return (
    <section id="Cart">
      <Container>
        <p className="Path">{t("Home")} / <span className="text-dark">{t("Cart")}</span></p>
        <div className="cart-top text-center">
          <Row>
            <Col lg={3} md={3} sm={12}><p>{t("Product")}</p></Col>
            <Col lg={3} md={3} sm={12}><p>{t("Price")}</p></Col>
            <Col lg={3} md={3} sm={12}><p>{t("Quantity")}</p></Col>
            <Col lg={3} md={3} sm={12}><p>{t("Subtotal")}</p></Col>
          </Row>
        </div>
        {Cart.map((cartItem) => (
          <div className="cartItem text-center" key={cartItem.id}>
            <Row>
              <Col lg={3} md={3} sm={12} className="align-content-center">
                <div className="left d-flex justify-content-center ms-3">
                  <div className="photo d-flex">
                    <span className="Close" onClick={() => dispatch(removeFromCart(cartItem))}>X</span>
                    <img src={cartItem.image} alt={t(cartItem.name)} className="cartItem-image" />
                  </div>
                  <h6 className="align-content-center">{t(cartItem.name).split(" ").slice(0, 2).join(" ")}</h6>
                </div>
              </Col>
              <Col lg={3} md={3} sm={12}><p>{Convert(cartItem.new_price)}</p></Col>
              <Col lg={3} md={3} sm={12} className="align-content-center">
                <div className="cartItem-quantity">
                  <div className="btns">
                    <button onClick={() => dispatch(increaseProduct(cartItem))}>
                      <i className="fa-solid fa-angle-up"></i>
                    </button>
                    {cartItem.quantity === 1 ? (
                      <button onClick={() => cartItem.quantity > 1 && dispatch(decreaseProduct(cartItem))} disabled>
                        <i className="fa-solid fa-angle-down"></i>
                      </button>) :
                      (<button onClick={() => cartItem.quantity > 1 && dispatch(decreaseProduct(cartItem))}>
                        <i className="fa-solid fa-angle-down"></i>
                      </button>)
                    }
                  </div>
                  <input className="quantity" type="number" readOnly value={String(cartItem.quantity).padStart(2, "0")} />
                </div>
              </Col>
              <Col lg={3} md={3} sm={12}><p>{Convert(cartItem.new_price * cartItem.quantity)}</p></Col>
            </Row>
          </div>
        ))}
        <div className="btns d-flex justify-content-between">
          <Link to='/'><button className="Return">{t("Return To Shop")}</button></Link>
          <button className="Update">{t("Update Cart")}</button>
        </div>
        <div className="cart-bottom mt-5">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="left">
                <input type="text" placeholder={t("Coupon Code")} />
                <button className="Apply">{t("Apply Coupon")}</button>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="right">
                <h5 className="mb-3">{t("Cart Total")}</h5>
                <div className="Subtotal d-flex justify-content-between">
                  <p>{t("Subtotal")}:</p>
                  <p>{Convert(totalPrice)}</p>
                </div>
                <hr />
                <div className="Shipping d-flex justify-content-between">
                  <p>{t("Shipping")}:</p>
                  <p>{t("Free")}</p>
                </div>
                <hr />
                <div className="Total d-flex justify-content-between">
                  <p>{t("Total")}:</p>
                  <p>{Convert(totalPrice)}</p>
                </div>
                <hr />
                <div className="bottom-btn text-center">
                  <Link to="/Cart/CheckOut"><button className="checkout">{t("Proceed to Checkout")}</button></Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Cart;
