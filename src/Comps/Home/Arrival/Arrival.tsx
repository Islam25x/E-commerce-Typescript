import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../Redux/Store";
import "./Arrival.css";

const Arrival = () => {
    const { t } = useTranslation();
    const IsLogin = useAppSelector((state) => state.user.IsLogin)
    return (
        <section id="Arrival">
            <Container>
                <span className="Featured">{t("Featured")}</span>
                <h2 className="title mt-3">{t("New Arrival")}</h2>
                <Row>
                    <Col lg={6} md={12} sm={12}>
                        <div className="left">
                            <div className="left-ctn">
                                <h4>{t("PlayStation 5")}</h4>
                                <p>{t("PlayStation Description")}</p>
                                {
                                    IsLogin ?
                                        (<Link to="/Account" className="text-light">{t("Shop Now")}</Link>) :
                                        (<Link to="/SignUp" className="text-light">{t("Shop Now")}</Link>)

                                }
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                        <div className="right">
                            <div className="right-top">
                                <img className="right-top-photo" src="images/girl.jpg" alt="" />
                                <div className="right-top-ctn">
                                    <h4>{t("Women’s Collections")}</h4>
                                    <p>{t("Women’s Description")}</p>
                                    {
                                        IsLogin ?
                                            (<Link to="/Account" className="text-light">{t("Shop Now")}</Link>) :
                                            (<Link to="/SignUp" className="text-light">{t("Shop Now")}</Link>)

                                    }
                                </div>
                            </div>
                            <div className="right-bottom">
                                <Row>
                                    <Col lg={6} md={12} sm={12}>
                                        <div className="right-bottom-left">
                                            <div className="right-bottom-left-ctn">
                                                <h4>{t("Speakers")}</h4>
                                                <p>{t("Speakers Description")}</p>
                                                {
                                                    IsLogin ?
                                                        (<Link to="/Account" className="text-light">{t("Shop Now")}</Link>) :
                                                        (<Link to="/SignUp" className="text-light">{t("Shop Now")}</Link>)

                                                }
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={12} sm={12}>
                                        <div className="right-bottom-right">
                                            <div className="right-bottom-right-ctn">
                                                <h4>{t("Perfume")}</h4>
                                                <p>{t("Perfume Description")}</p>
                                                {
                                                    IsLogin ?
                                                        (<Link to="/Account" className="text-light">{t("Shop Now")}</Link>) :
                                                        (<Link to="/SignUp" className="text-light">{t("Shop Now")}</Link>)

                                                }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Arrival;
