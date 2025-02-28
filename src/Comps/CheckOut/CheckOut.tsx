import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAppSelector } from "../Redux/Store";
import { useNavigate } from "react-router";
import Convert from "../functions/FormatCurrncy";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./CheckOut.css";

const CheckOut: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const cartProducts = useAppSelector((state) => state.cart.cart);

  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    email: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document
      .getElementById("CheckOut")
      ?.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  useEffect(() => {
    const { firstName, streetAddress, city, phoneNumber, email } = formData;
    setIsFormValid(
      firstName.trim() !== "" &&
      streetAddress.trim() !== "" &&
      city.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      email.trim() !== ""
    );
  }, [formData]);

  const handlePlaceOrder = () => {
    if (!isFormValid) {
      toast.error(t("Please fill in all required fields!"));
      return;
    }
    if (!selectedPayment) {
      toast.error(t("Please select a payment method!"));
      return;
    }

    toast.success(t("Order placed successfully!"));

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <section id="CheckOut">
      <Container>
        <p className="Path">
          {t("Home")} / {t("Cart")} / <span className="text-dark">{t("CheckOut")}</span>
        </p>
        <h1 className="mb-5">{t("Billing Details")}</h1>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div className="left">
              {[
                { label: "First Name", name: "firstName" },
                { label: "Company Name", name: "companyName" },
                { label: "Street Address", name: "streetAddress" },
                { label: "Apartment, floor, etc. (optional)", name: "apartment" },
                { label: "Town/City", name: "city" },
                { label: "Phone Number", name: "phoneNumber" },
                { label: "Email Address", name: "email" },
              ].map(({ label, name }, index) => (
                <div className="inp-filed" style={{ marginBottom: "1.6rem" }} key={index}>
                  <p>
                    {t(label)} {index !== 1 && <span className="text-danger">*</span>}
                  </p>
                  <input
                    type="text"
                    name={name}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    required={index !== 1 && index !== 3}
                  />
                </div>
              ))}
              <input type="checkbox" className="check" />
              <label className="ms-2">
                {t("Save this information for faster check-out next time")}
              </label>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <div className="right">
              <div className="right-top">
                <div className="right-cart">
                  {cartProducts &&
                    cartProducts.map((cartItem) => (
                      <div className="cart-products d-flex justify-content-between mb-4" key={cartItem.id}>
                        <div className="photo d-flex" style={{ margin: "auto 0" }}>
                          <img src={cartItem.image} alt={cartItem.name} className="cartItem-image" />
                          <h6 style={{ margin: "auto 1rem" }}>
                            {cartItem.name.split(" ").slice(0, 2).join(" ")}
                          </h6>
                        </div>
                        <p>{Convert(cartItem.new_price * cartItem.quantity)}</p>
                      </div>
                    ))}
                </div>
                <div className="right-price">
                  {["Subtotal", "Shipping", "Total"].map((label, index) => (
                    <div className="d-flex justify-content-between" style={{ marginBottom: "-1rem" }} key={index}>
                      <p>{t(label)}:</p>
                      <p>{label === "Shipping" ? t("free") : Convert(totalPrice)}</p>
                    </div>
                  ))}
                  <hr />
                </div>
                <div className="pay d-flex justify-content-between">
                  <form>
                    {["Bank", "Cash on delivery"].map((method) => (
                      <div
                        className="mt-4 d-flex align-items-center"
                        key={method}
                        style={i18n.language === "ar" ? { gap: "1rem" } : {}}
                      >
                        <input
                          type="radio"
                          id={method.toLowerCase()}
                          name="payment"
                          value={method}
                          checked={selectedPayment === method}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                        />
                        <label htmlFor={method.toLowerCase()} className="ms-3" style={{ fontSize: "18px" }}>
                          {t(method)}
                        </label>
                      </div>
                    ))}
                  </form>
                </div>
              </div>
              <div className={`Coupon mt-3 ${i18n.language === "ar" ? "arabic-spacing" : ""}`}>
                <input type="text" placeholder={t("Coupon Code")} />
                <button className="Apply">{t("Apply Coupon")}</button>
              </div>
              <button
                className="Order mt-3"
                style={{ marginLeft: "0rem" }}
                onClick={handlePlaceOrder}
              >
                {t("Place Order")}
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-center" autoClose={3000} transition={Bounce} />
    </section>
  );
};

export default CheckOut;
