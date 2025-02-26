import { Container } from "react-bootstrap";
import "./NavTop.css";
import { useTranslation } from "react-i18next";
const NavTop = () => {
    const { t , i18n } = useTranslation();

    const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <header id="NavTop">
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <span>
                        {t("Summer Sale")} {" "} <a>{t("ShopNow")}</a>
                    </span>
                    <select onChange={changeLanguage} defaultValue={i18n.language}>
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                    </select>
                </div>
            </Container>
        </header>
    );
};

export default NavTop;
