import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../Redux/LoginSystem/UserSlice';
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import NavLogSign from "../nav/NavLogSign";
import { Col, Container, Row } from "react-bootstrap";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const users = useAppSelector((state) => state.user.users);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reset error before validation

        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        const user = users.find(user => user.email === email && user.password === password);
        const userEmailExists = users.some(user => user.email === email);
        const userPasswordCorrect = users.some(user => user.password === password);

        if (!userEmailExists) {
            setError("Email does not exist");
            return;
        }

        if (userEmailExists && !userPasswordCorrect) {
            setError("Password is incorrect");
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
                            alt="Sign Img"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <div className="right-side">
                            <h1 className="heading">Log in to Exclusive</h1>
                            <p className="sub-heading">Enter your details below</p>

                            <form className="form" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    className="input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
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
                                        {isLoading ? "Logging in..." : "Log In"}
                                    </button>
                                    <p>Forget Password?</p>
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
