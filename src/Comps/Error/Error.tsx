import { Container} from "react-bootstrap";
import { Link } from "react-router";

import './Error.css'
const Error = () => {
return (
    <section id="Error">
        <Container>
            <p className="Path">
                Home / <span className="text-dark">404 Error</span>
            </p>
            <div className="Error-ctn text-center">
                <h1>404 Not Found</h1>
                <p>Your visited page not found. You may go home page.</p>
                <Link to='/'>
                    <button style={{ marginTop: "3rem" }}>
                        Back to home page
                    </button>
                </Link>
            </div>
        </Container>
    </section>
);
};

export default Error;
