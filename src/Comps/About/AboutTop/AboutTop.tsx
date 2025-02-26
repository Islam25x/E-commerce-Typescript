import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../Redux/Store";
import NavHomeAcc from "../../nav/navHomeAcc";
import NavHome from "../../nav/NavHome";
import "./AboutTop.css";

const AboutTop = () => {
    const { t } = useTranslation();
    const IsLogin = useAppSelector((state) => state.user.IsLogin);

    return (
        <section id="AboutTop">
            {IsLogin ? <NavHomeAcc /> : <NavHome />}
            <Container>
                <p className="Path">
                    {t("Account")} / <span className="text-dark">{t("About")}</span>
                </p>
                <Row>
                    <Col lg={6} md={6} sm={12} className="mt-4">
                        <h1 className="my-5">{t("Our Story")}</h1>
                        <p className="mb-4">
                            {t(
                                "Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands, serving 3 million customers across the region."
                            )}
                        </p>
                        <p>
                            {t(
                                "Exclusive offers more than 1 million products and is growing rapidly. It provides a diverse assortment in categories ranging from consumer electronics to fashion and lifestyle products."
                            )}
                        </p>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <img
                            src="https://s3-alpha-sig.figma.com/img/fcc8/9aaa/7b85f8c1dcce81e71e2eb178be13bd4d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Pi9jd2c2anGqpDi-hVGp~up5rsuRKCAIOohTUstcR91DqlDRNw978h9WSC85p5VHxf0eLGo3ysPh7jr2~9TI1UO05F8Gz~uylT3Xkc7xFWb7o~XjbPnQ5yDwCn805dZKGPO7aR8lKsSIEugMNY3X5PEsecJHXOzJ1OcnJ8uzr0XWhkIIuq8kVf1VdfopG6hlgsWxaBdmo3R2wBLMs9vOcHxuhFux2VKoaNjI9cB~iaVeCmguijNq7xP56D0X~tiGm-tk2QEGHxDbhVgbPlqFJds97rEw4kU149KP-UsVXUGL4lARG7Py6nqN6j9QS~7IXTO03Uh5mPBf0V~ywsqQdw__"
                            alt={t("About")}
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutTop;
