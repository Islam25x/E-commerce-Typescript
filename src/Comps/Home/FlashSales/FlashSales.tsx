import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Convert from "../../functions/FormatCurrncy";
import { Link } from "react-router-dom";
import { addFavourite, removeFavourite } from "../../Redux/FavouriteSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { fetchProducts, removeFromCart, addToCart, getProductById, renderStars } from "../../Redux/CartSlice";
import { useTranslation } from "react-i18next";

import "@fortawesome/fontawesome-free/css/all.css";
import 'swiper/swiper-bundle.css';
import "./FlashSales.css";
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
const FlashSales = () => {
    const { t } = useTranslation();
    const IsLogin = useAppSelector((state) => state.user.IsLogin)
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
    const swiperRef = useRef<any>(null);

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
                <span className="Today">{t('today')}</span>
                <div className="left-side d-flex justify-content-between flex-wrap">
                    <div className="Flash-Top d-flex">
                        <h2 className="title">{t('flash_sales')}</h2>
                        <div className="timer me-3"><p>{t('days')}</p><h2>{String(days).padStart(2, "0")}</h2></div>
                        <span>:</span>
                        <div className="timer"><p>{t('hours')}</p><h2>{String(hours).padStart(2, "0")}</h2></div>
                        <span>:</span>
                        <div className="timer"><p>{t('minutes')}</p><h2>{String(minutes).padStart(2, "0")}</h2></div>
                        <span>:</span>
                        <div className="timer"><p>{t('seconds')}</p><h2>{String(seconds).padStart(2, "0")}</h2></div>
                    </div>
                </div>

                {!viewAll && (
                    <div className="swiper-nav-buttons">
                        <button onClick={handlePrev} className="swiper-button prev">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button onClick={handleNext} className="swiper-button next">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                )}

                {!viewAll ? (
                    <Swiper
                        className="position-relative"
                        ref={swiperRef}
                        modules={[Navigation]}
                        spaceBetween={40}
                        slidesPerView={4}
                        breakpoints={{
                            320: { slidesPerView: 2, spaceBetween: 10 },
                            768: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                            1440: { slidesPerView: 4, spaceBetween: 40 },
                        }}
                    >
                        {sales.map((sale) => (
                            <SwiperSlide key={sale.id}>
                                <div className="product">
                                    <div className="product-top d-flex justify-content-between">
                                        <img src={sale.image} alt={sale.name} />
                                        <span className="sale-persent">{sale.salepersent}</span>
                                        <div className="icons">
                                            {
                                                IsLogin ? (
                                                    isInFavorite(sale.id) ? (
                                                        <i onClick={() => dispatch(removeFavourite(sale))} className="fa-solid fa-heart active"></i>
                                                    ) : (
                                                        <i onClick={() => dispatch(addFavourite(sale))} className="fa-regular fa-heart"></i>
                                                    )
                                                ) : (
                                                    <Link to="/SignUp">
                                                        <i className="fa-regular fa-heart"></i>
                                                    </Link>
                                                )
                                            }
                                            {
                                                IsLogin ? (
                                                    <Link onClick={() => dispatch(getProductById(sale.id))} to={`/Description/${sale.id}`}>
                                                        <i className="fa-regular fa-eye"></i>
                                                    </Link>
                                                ) : (
                                                    <Link to="/SignUp">
                                                        <i className="fa-regular fa-eye"></i>
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {
                                        IsLogin ? (
                                            isInCart(sale.id) ? (
                                                <div onClick={() => dispatch(removeFromCart(sale))} className="RemoveCart">
                                                    <p>{t('Remove_From_Cart')}</p>
                                                </div>
                                            ) : (
                                                <div onClick={() => dispatch(addToCart(sale))} className="addCart">
                                                    <p>{t('add_to_cart')}</p>
                                                </div>
                                            )
                                        ) : (
                                            <Link to="/SignUp" className="addCart">
                                                <p>{t("add_to_cart")}</p>
                                            </Link>
                                        )
                                    }
                                    <div className="product-des">
                                        <p className="product-title">{t(sale.name)}</p>
                                        <div className="price d-flex">
                                            <p className="curr-price">{Convert(sale.new_price)}</p>
                                            {sale.old_price !== null && (
                                                <p className="prev-price">{Convert(sale.old_price)}</p>
                                            )}
                                        </div>
                                        <div className="star-ctn d-flex">{renderStars(sale.stars)}</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <Row>
                        {sales.map((sale) => (
                            <Col lg={3} md={6} sm={6} key={sale.id}>
                                <div className="product product-grid">
                                    <div className="product-top d-flex justify-content-between">
                                        <img src={sale.image} alt={sale.name} />
                                        <span className="sale-persent">{sale.salepersent}</span>
                                        <div className="icons">
                                            {
                                                IsLogin ? (
                                                    isInFavorite(sale.id) ? (
                                                        <i onClick={() => dispatch(removeFavourite(sale))} className="fa-solid fa-heart active"></i>
                                                    ) : (
                                                        <i onClick={() => dispatch(addFavourite(sale))} className="fa-regular fa-heart"></i>
                                                    )
                                                ) : (
                                                    <Link to="/SignUp">
                                                        <i className="fa-regular fa-heart"></i>
                                                    </Link>
                                                )
                                            }
                                            {
                                                IsLogin ? (
                                                    <Link onClick={() => dispatch(getProductById(sale.id))} to={`/Description/${sale.id}`}>
                                                        <i className="fa-regular fa-eye"></i>
                                                    </Link>
                                                ) : (
                                                    <Link to="/SignUp">
                                                        <i className="fa-regular fa-eye"></i>
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <Link to="/SignUp" className="addCart"><p>{t('add_to_cart')}</p></Link>
                                    <div className="product-des">
                                        <p className="product-title">{t(sale.name)}</p>
                                        <div className="price d-flex">
                                            <p className="curr-price">{Convert(sale.new_price)}</p>
                                            {sale.old_price !== null && (
                                                <p className="prev-price">{Convert(sale.old_price)}</p>
                                            )}
                                        </div>
                                        <div className="star-ctn d-flex">{renderStars(sale.stars)}</div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}

                <div className="text-center my-5">
                    <button className="View-All" onClick={() => setViewAll(!viewAll)}>
                        {viewAll ? t('back_to_swiper') : t('view_all_products')}
                    </button>
                </div>
            </Container>
        </section>
    );
};

export default FlashSales;
