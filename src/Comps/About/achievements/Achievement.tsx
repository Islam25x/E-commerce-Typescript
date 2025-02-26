import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./Achievement.css";

const Achievement = () => {
    const { t } = useTranslation();

    return (
        <section id="Achievement">
            <Container>
                <Row>
                    <Col lg={3} md={6} sm={12}>
                        <div className="Achievement-ctn text-center">
                            <div className="icon">
                                <i className="fa-solid fa-shop"></i>
                            </div>
                            <h3 style={{ fontWeight: "700" }}>10.5k</h3>
                            <p>{t("Sellers active on our site")}</p>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <div className="Achievement-ctn text-center">
                            <div className="icon">
                                <i className="fa-solid fa-dollar-sign"></i>
                            </div>
                            <h3 style={{ fontWeight: "700" }}>33k</h3>
                            <p>{t("Monthly Product Sales")}</p>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <div className="Achievement-ctn text-center">
                            <div className="icon">
                                <i className="fa-solid fa-gift"></i>
                            </div>
                            <h3 style={{ fontWeight: "700" }}>45.5k</h3>
                            <p>{t("Active Customers on Our Site")}</p>
                        </div>
                    </Col>
                    <Col lg={3} md={6} sm={12}>
                        <div className="Achievement-ctn text-center">
                            <div className="icon">
                                <i className="fa-solid fa-sack-dollar"></i>
                            </div>
                            <h3 style={{ fontWeight: "700" }}>25k</h3>
                            <p>{t("Annual Gross Sales on Our Site")}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Achievement;
