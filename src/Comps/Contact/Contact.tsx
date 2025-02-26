import { useRef, FormEvent } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../Redux/Store";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Comps
import NavHome from "../nav/NavHome";
import NavHomeAcc from "../nav/navHomeAcc";
import "./Contact.css";

const Contact: React.FC = () => {
    const { t } = useTranslation();
    const IsLogin = useAppSelector((state) => state.user.IsLogin);
    const formRef = useRef<HTMLFormElement | null>(null);

    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const firstName = formData.get("name") as string;
        const email = formData.get("Email") as string;
        const phone = formData.get("number") as string;
        const message = formData.get("message") as string;

        if (!firstName || !email || !phone || !message) {
            toast.error(t("Please fill out all the fields."), {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
        } else {
            toast.success(t("Thank you for your message. It has been sent."), {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    return (
        <>
            {IsLogin ? <NavHomeAcc /> : <NavHome />}
            <section id="Contact">
                <Container>
                    <ToastContainer />
                    <p className="Path">
                        {t("Home")} /<span className="text-dark"> {t("Contact")}</span>
                    </p>
                    <Row>
                        <Col lg={3} md={3} sm={12}>
                            <div className="contact-card">
                                <div className="contact-section" style={{ borderBottom: "3px solid #cccccc" }}>
                                    <div className="icon-title">
                                        <i className="fa-solid fa-phone"></i>
                                        <h6>{t("Call To Us")}</h6>
                                    </div>
                                    <div className="description">
                                        <p>{t("We are available 24/7, 7 days a week.")}</p>
                                        <p>{t("Phone")}: +880161112222</p>
                                    </div>
                                </div>
                                <div className="contact-section">
                                    <div className="icon-title">
                                        <i className="fa-regular fa-envelope"></i>
                                        <h6>{t("Write To Us")}</h6>
                                    </div>
                                    <div className="description">
                                        <p>{t("Fill out our form and we will contact you within 24 hours.")}</p>
                                        <p>{t("Emails")}: customer@exclusive.com</p>
                                        <p>{t("Emails")}: support@exclusive.com</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={9} md={9} sm={12}>
                            <div className="input-section">
                                <form ref={formRef} onSubmit={sendEmail}>
                                    <div className="top d-flex">
                                        <input className="ms-0" type="text" name="name" id="name" placeholder={t("Your Name *")} />
                                        <input type="email" name="Email" id="Email" placeholder={t("Your Email *")} />
                                        <input type="tel" name="number" id="number" placeholder={t("Your Phone *")} />
                                    </div>
                                    <div className="body">
                                        <textarea name="message" placeholder={t("Your Message")}></textarea>
                                    </div>
                                    <div className="bottom d-flex justify-content-end" style={{ margin: "1rem 0" }}>
                                        <button type="submit" className="save-btn">{t("Send Message")}</button>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Contact;
