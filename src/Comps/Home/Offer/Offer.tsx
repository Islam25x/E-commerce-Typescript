import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { fetchProducts, removeFromCart, addToCart } from "../../Redux/CartSlice";
import './Offer.css';

type Product = {
    id: number;
    name: string;
    image: string;
    description: string;
    InStock: boolean;
    Sale: boolean;
    Type: string;
    category: string;
    color1?: string;
    color2?: string;
    new_price: number;
    old_price: number | null;
    quantity: number;
    reviews: number;
    salebg?: string;
    salepersent?: string;
    stars: number;
    Bcategory?: string;
    pices: number;
};
const Offer = () => {
    const { t } = useTranslation();
    const [timer, setTimer] = useState(2121431);
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.cart);
    const IsLogin = useAppSelector((state) => state.user.IsLogin)
    const cartItems: Product[] = useAppSelector((state) => state.cart.cart);
    const product: Product | null = products ? products[17] : null;

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    const isInCart = (cartItemId: number) => cartItems.some((cartItem) => cartItem.id === cartItemId);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = () => {
        const days = Math.floor(timer / (24 * 3600));
        const hours = Math.floor((timer % (24 * 3600)) / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;
        return { days, hours, minutes, seconds };
    };

    const { days, hours, minutes, seconds } = formatTime();

    return (
        <section id="Offer">
            <Container className="main-container d-flex align-items-center">
                <Row>

                    <Col lg={6} md={6} sm={12} className="text-white">
                        <div className="left">
                            <p className="text-success fw-bold">{t("Categories")}</p>
                            <h1>{t("offerTitle")}</h1>
                            <div className="timer d-flex">
                                <div className="time-box">
                                    {String(days).padStart(2, "0")} <span>{t("days")}</span>
                                </div>
                                <div className="time-box">
                                    {String(hours).padStart(2, "0")} <span>{t("hours")}</span>
                                </div>
                                <div className="time-box">
                                    {String(minutes).padStart(2, "0")} <span>{t("minutes")}</span>
                                </div>
                                <div className="time-box">
                                    {String(seconds).padStart(2, "0")} <span>{t("seconds")}</span>
                                </div>
                            </div>
                            {
                                IsLogin ?
                                    product && (  // Ensure product is fetched before rendering the button
                                        !isInCart(product.id) ? (
                                            <button className="Buy-Now" onClick={() => dispatch(addToCart(product))}>
                                                {t("buyNow")}
                                            </button>
                                        ) : (
                                            <button className="Buy-Now bg-danger" onClick={() => dispatch(removeFromCart(product))}>
                                               {t("Remove_From_Cart")}
                                            </button>
                                        )
                                    ) :

                                    <Link to="/SignUp">
                                        <button className="Buy-Now">{t("buyNow")}</button>
                                    </Link>
                            }

                        </div>
                    </Col>
                    <Col lg={6} md={6} sm={12} className="text-center">
                        <img src="images/Sapp.png" alt="Sapp" className="img product-image" />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Offer;
