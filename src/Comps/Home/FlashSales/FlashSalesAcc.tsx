import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Convert from "../../../functions/FormatCurrncy";
import { Link } from "react-router-dom";
import { addFavourite, removeFavourite } from "../../Redux/FavouriteSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { fetchProducts, removeFromCart, addToCart, getProductById, renderStars } from "../../Redux/CartSlice";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "./FlashSales.css";

// Define product type
type Product = {
    id: number;
    name: string;
    image: string;
    description: string;
    InStock: boolean;
    Sale: boolean;
    Type: string;
    category: string;
    color1: string;
    color2: string;
    new_price: number;
    old_price: number | null;
    quantity: number;
    reviews: number;
    salebg: string;
    salepersent: string;
    stars: number;
};
const FlashSalesAcc = () => {
    // Timer
    const [timer, setTimer] = useState(305400);

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

    // Fetch Flash Sales

    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.cart);
    const cartItems: Product[] = useAppSelector((state) => state.cart.cart);
    const favourites: Product[] = useAppSelector((state) => state.favourites.favourites);
    const sales: Product[] = products ? products.filter((product) => product.Sale) : [];

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    const isInCart = (cartItemId: number) => cartItems.some((cartItem) => cartItem.id === cartItemId);
    const isInFavorite = (favouriteId: number) => favourites.some((favourite) => favourite.id === favouriteId);

    // State for viewAll
    const [viewAll, setViewAll] = useState(false);



    // Reference to the Swiper instance
    const swiperRef = useRef(null);

    // Handle Next and Prev navigation
    const handleNext = () => {
        if (swiperRef.current) swiperRef.current.swiper.slideNext();
    };

    const handlePrev = () => {
        if (swiperRef.current) swiperRef.current.swiper.slidePrev();
    };
    return (
        <section id="FlashSales">
            <Container>
                <span className="Today">Today’s</span>
                <div className="left-side d-flex justify-content-between flex-wrap">
                    <div className="Flash-Top d-flex">
                        <h2 className="title">Flash Sales</h2>
                        <div className="timer me-3">
                            <p>Days</p>
                            <h2>{String(days).padStart(2, "0")}</h2>
                        </div>
                        <span>:</span>
                        <div className="timer">
                            <p>Hours</p>
                            <h2>{String(hours).padStart(2, "0")}</h2>
                        </div>
                        <span>:</span>
                        <div className="timer">
                            <p>Minutes</p>
                            <h2>{String(minutes).padStart(2, "0")}</h2>
                        </div>
                        <span>:</span>
                        <div className="timer">
                            <p>Seconds</p>
                            <h2>{String(seconds).padStart(2, "0")}</h2>
                        </div>
                    </div>
                    {/* Custom Navigation Buttons */}
                    {!viewAll ? (
                        <div className="swiper-nav-buttons">
                            <button onClick={handlePrev} className="swiper-button prev">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button onClick={handleNext} className="swiper-button next">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    ) : null}
                </div>

                {!viewAll ? (
                    <Swiper
                        className="position-relative"
                        ref={swiperRef}
                        modules={[Navigation]}
                        breakpoints={{
                            320: { slidesPerView: 2, spaceBetween: 10 },
                            768: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                            1440: { slidesPerView: 4, spaceBetween: 40 },
                        }}
                        spaceBetween={40}
                        slidesPerView={4} // Ensures proper product layout
                    >
                        {sales.slice(0, 8).map((item) => ( // Ensure only 8 products fit in 2 rows
                            <SwiperSlide key={item.id}>
                                <div className="product">
                                    <div className="product-top d-flex justify-content-between">
                                        <img src={item.image} alt={item.name} />
                                        {item.salepersent ? (
                                            <span className="sale-persent" style={{ backgroundColor: "#00FF66" }}>
                                                {item.salepersent}
                                            </span>
                                        ) :
                                            (<div></div>)
                                        }
                                        <div className="icons">
                                            {isInFavorite(item.id) ? (
                                                <i
                                                    onClick={() => dispatch(removeFavourite(item))}
                                                    className="fa-solid fa-heart active"
                                                ></i>
                                            ) : (
                                                <i
                                                    onClick={() => dispatch(addFavourite(item))}
                                                    className="fa-regular fa-heart"
                                                ></i>
                                            )}
                                            <Link onClick={() => dispatch(getProductById(item))} to={`/Description/${item.id}`}>
                                                <i className="fa-regular fa-eye"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    {isInCart(item.id) ? (
                                        <div onClick={() => dispatch(removeFromCart(item))} className="RemoveCart">
                                            <p>Remove From Cart</p>
                                        </div>
                                    ) : (
                                        <div onClick={() => dispatch(addToCart(item))} className="addCart">
                                            <p>Add To Cart</p>
                                        </div>
                                    )}
                                    <div className="product-des">
                                        <p className="product-title">{item.name}</p>
                                        <div className="price d-flex">
                                            <p className="curr-price">{Convert(item.new_price)}</p>
                                            <div className="star-ctn d-flex ms-2">
                                                {renderStars(item.stars)}
                                                <span className="reviews ms-2">({item.reviews || 0})</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <Row>
                        {sales.map((item) => (
                            <Col lg={3} md={6} sm={6} key={item.id}>
                                <div className="product">
                                    <div className="product-top d-flex justify-content-between">
                                        <img src={item.image} alt={item.name} />
                                        {item.salepersent ? (
                                            <span className="sale-persent" style={{ backgroundColor: "#00FF66" }}>
                                                {item.salepersent}
                                            </span>
                                        ) :
                                            (<div></div>)
                                        }
                                        <div className="icons">
                                            {isInFavorite(item.id) ? (
                                                <i
                                                    onClick={() => dispatch(removeFavourite(item))}
                                                    className="fa-solid fa-heart active"
                                                ></i>
                                            ) : (
                                                <i
                                                    onClick={() => dispatch(addFavourite(item))}
                                                    className="fa-regular fa-heart"
                                                ></i>
                                            )}
                                            <Link onClick={() => dispatch(getProductById(item))} to={`/Description/${item.id}`}>
                                                <i className="fa-regular fa-eye"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    {isInCart(item.id) ? (
                                        <div onClick={() => dispatch(removeFromCart(item))} className="RemoveCart">
                                            <p>Remove From Cart</p>
                                        </div>
                                    ) : (
                                        <div onClick={() => dispatch(addToCart(item))} className="addCart">
                                            <p>Add To Cart</p>
                                        </div>
                                    )}
                                    <div className="product-des">
                                        <p className="product-title">{item.name}</p>
                                        <div className="price d-flex">
                                            <p className="curr-price">{Convert(item.new_price)}</p>
                                            <div className="star-ctn d-flex ms-2">
                                                {renderStars(item.stars)}
                                                <span className="reviews ms-2">({item.reviews || 0})</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
                <div className="text-center my-5">
                    <button
                        className="View-All"
                        onClick={() => setViewAll((prev) => !prev)}
                    >
                        {viewAll ? "Back to Swiper" : "View All Products"}
                    </button>
                </div>
                <hr style={{ color: "gray" }} />
            </Container>
        </section>
    );
};

export default FlashSalesAcc;
