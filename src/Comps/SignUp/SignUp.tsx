import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavLogSign from "../nav/NavLogSign";
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import { createUser } from "../Redux/LoginSystem/UserSlice";

import "./SignUp.css";

const SignUp = () => {
    const { t, i18n } = useTranslation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const users = useAppSelector((state) => state.user.users);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById("SignUp")?.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
    }, [i18n.language]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && password && email) {
            const existingUser = users.find((user) => user.email === email);
            if (password.length < 6) {
                setError(t("Password must be at least 6 characters long"));
                setSuccess(false);
                return;
            }
            if (existingUser) {
                setError(t("Email already exists"));
                setSuccess(false);
                return;
            } else {
                setSuccess(true);
                dispatch(createUser({ username, email, password }));
                setIsLoading(true);
                navigate("/Login");
            }
        }
    };

    return (
        <section id="SignUp">
            <NavLogSign />
            <Container>
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <img
                            src="https://s3-alpha-sig.figma.com/img/75f3/94c0/a1c7dc5b68a42239311e510f54d8cd59?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=t8wZHsu4t6sGNRdp2hgNCK-cXVlo~fej8Sdy0iSiC~D6BiHQRn9qjOYV3lC~nE1De9jnl1Pu095mw5rEzp5XWlbk8Tx19uwLGDZ1VSmq-GouE8aVcN2XzrKcx8~45HTfIYh7oCd23~kM-6FSBWy1FyDwXxSfQQ0bH05tIEST6KSrtqldRsZequVOhDprGo0YElOaW9z3YwZzC4l7XPRvNveG-UlHzbNQyp8H3M89yPcGqGh7u~tDPGdZ1z49WiEYwbwgqInrjfb-AJL9SkkqKDTJH8TsgFxL-4W7XLim9cldWC3vsFy-GMiC0cHJyKQQEk2dkdFumix~chKrppmejA__"
                            alt="Sign Img"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <div className="right-side">
                            <h1 className="heading">{t("Create an account")}</h1>
                            <p className="sub-heading">{t("Enter your details below")}</p>
                            <form className="form" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={t("Name")}
                                    className="input ps-4"
                                    autoComplete="on"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                />
                                <input
                                    type="text"
                                    name="email"
                                    placeholder={t("Email or Phone Number")}
                                    className="input input ps-4"
                                    autoComplete="on"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder={t("Password")}
                                    className="input input ps-4"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                {!success && <div className="text-danger">{error}</div>}
                                <button type="submit" className="button" disabled={isLoading}>
                                    {isLoading ? t("Processing...") : t("Create Account")}
                                </button>
                            </form>
                            <p className="login">
                                {t("Already have an account?")} <Link to="/Login">{t("Log in")}</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default SignUp;
