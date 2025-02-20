import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import NavLogSign from "../nav/NavLogSign";
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import { createUser } from "../Redux/LoginSystem/UserSlice";

import "./SignUp.css";
const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const users = useAppSelector((state) => state.user.users)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && password && email) {
            const existingUser = users.find(user => user.email === email)
            if (password.length < 6) {
                setError('Password must be at least 6 characters long')
                setSuccess(false)
                return
            }
            if (existingUser) {
                setError('Email already exists')
                setSuccess(false)
                return
            }
            else {
                setSuccess(true)
                dispatch(createUser({ username, email, password }))
                setIsLoading(true)
                navigate('/Login')
            }

        }
    }



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
                            <h1 className="heading">Create an account</h1>
                            <p className="sub-heading">Enter your details below</p>
                            <form className="form" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="input"
                                    autoComplete="on"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                />
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email or Phone Number"
                                    className="input"
                                    autoComplete="on"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                {
                                    !success && 
                                    (<div className="text-danger">{error}</div>)
                                }
                                <button type="submit" className="button" disabled={isLoading}>
                                    {isLoading ? "Processing..." : "Create Account"}
                                </button>
                                {/* <button className=" google-button" onClick={handleGoogleSignIn}>
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_12688_3336)">
                                            <path d="M23.766 12.7764C23.766 11.9607 23.6999 11.1406 23.5588 10.3381H12.24V14.9591H18.7217C18.4528 16.4494 17.5885 17.7678 16.323 18.6056V21.6039H20.19C22.4608 19.5139 23.766 16.4274 23.766 12.7764Z" fill="#4285F4" />
                                            <path d="M12.2401 24.5008C15.4766 24.5008 18.2059 23.4382 20.1945 21.6039L16.3276 18.6055C15.2517 19.3375 13.8627 19.752 12.2445 19.752C9.11388 19.752 6.45946 17.6399 5.50705 14.8003H1.5166V17.8912C3.55371 21.9434 7.7029 24.5008 12.2401 24.5008Z" fill="#34A853" />
                                            <path d="M5.50253 14.8003C4.99987 13.3099 4.99987 11.6961 5.50253 10.2057V7.11481H1.51649C-0.18551 10.5056 -0.18551 14.5004 1.51649 17.8912L5.50253 14.8003Z" fill="#FBBC04" />
                                            <path d="M12.2401 5.24966C13.9509 5.2232 15.6044 5.86697 16.8434 7.04867L20.2695 3.62262C18.1001 1.5855 15.2208 0.465534 12.2401 0.500809C7.7029 0.500809 3.55371 3.05822 1.5166 7.11481L5.50264 10.2058C6.45064 7.36173 9.10947 5.24966 12.2401 5.24966Z" fill="#EA4335" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_12688_3336">
                                                <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    Sign Up with Google
                                </button>
                                {successMsg && <p className="succMsg">{successMsg}</p>}
                                {firebaseError && <p className="errorMsg">{firebaseError}</p>} */}
                            </form>
                            <p className="login">
                                Already have an account? <Link to="/Login">Log in</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default SignUp;
