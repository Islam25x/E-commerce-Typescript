import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { setCurrentUser } from '../Redux/LoginSystem/UserSlice';
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import NavLogSign from "../nav/NavLogSign";
import { Col, Container, Row } from "react-bootstrap";
import './Login.css';

const Login = () => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const users = useAppSelector((state) => state.user.users);

    useEffect(() => {
        document.getElementById("Login")?.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
    }, [i18n.language]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reset error before validation

        if (!email || !password) {
            setError(t("errors.fill_fields"));
            return;
        }

        const user = users.find(user => user.email === email && user.password === password);
        const userEmailExists = users.some(user => user.email === email);
        const userPasswordCorrect = users.some(user => user.password === password);

        if (!userEmailExists) {
            setError(t("errors.email_not_exist"));
            return;
        }

        if (userEmailExists && !userPasswordCorrect) {
            setError(t("errors.wrong_password"));
            return;
        }

        if (user) {
            dispatch(setCurrentUser(user));
            setIsLoading(true);
            navigate('/');
        }
    };

    return (
        <section id="Login">
            <NavLogSign />
            <Container>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <img
                            src="https://s3-alpha-sig.figma.com/img/75f3/94c0/a1c7dc5b68a42239311e510f54d8cd59?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=t8wZHsu4t6sGNRdp2hgNCK-cXVlo~fej8Sdy0iSiC~D6BiHQRn9qjOYV3lC~nE1De9jnl1Pu095mw5rEzp5XWlbk8Tx19uwLGDZ1VSmq-GouE8aVcN2XzrKcx8~45HTfIYh7oCd23~kM-6FSBWy1FyDwXxSfQQ0bH05tIEST6KSrtqldRsZequVOhDprGo0YElOaW9z3YwZzC4l7XPRvNveG-UlHzbNQyp8H3M89yPcGqGh7u~tDPGdZ1z49WiEYwbwgqInrjfb-AJL9SkkqKDTJH8TsgFxL-4W7XLim9cldWC3vsFy-GMiC0cHJyKQQEk2dkdFumix~chKrppmejA__"
                            alt={t("login.image_alt")}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <div className="right-side">
                            <h1 className="heading">{t("login.title")}</h1>
                            <p className="sub-heading">{t("login.subtitle")}</p>

                            <form className="form" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder={t("login.email_placeholder")}
                                    className="input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder={t("login.password_placeholder")}
                                    className="input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}

                                <div className="btns d-flex justify-content-between">
                                    <button
                                        type="submit"
                                        className="button"
                                        style={{ width: '9rem' }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? t("login.loading") : t("login.button")}
                                    </button>
                                    <p>{t("login.forgot_password")}</p>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;
