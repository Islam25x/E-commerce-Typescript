import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { fetchProducts, removeFromCart, addToCart, getProductById, renderStars } from "../../Redux/CartSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import Convert from "../../functions/FormatCurrncy";
import { addFavourite, removeFavourite } from "../../Redux/FavouriteSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "swiper/swiper-bundle.css";
import "./ExploreProducts.css";
import "../FlashSales/FlashSales.css";

interface Product {
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
    salebg?: string;
    salepersent?: string;
    stars: number;
    Bcategory?: string;
    pices: number;
}

const ExploreProducts: React.FC = () => {
    const { t } = useTranslation(); // استخدام الترجمة
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.cart);
    const IsLogin = useAppSelector((state) => state.user.IsLogin)
    const cartItems: Product[] = useAppSelector((state) =>
        state.cart.cart.map((item) => ({
            ...item,
            color1: item.color1 || "", // إذا كانت `undefined` اجعلها سلسلة فارغة
            color2: item.color2 || "",
        }))
    );
    const favourites: Product[] = useAppSelector((state) =>
        state.favourites.favourites.map((item) => ({
            ...item,
            color1: item.color1 || "", // إذا كانت `undefined` اجعلها سلسلة فارغة
            color2: item.color2 || "",
        }))
    );

    const Explore: Product[] = products
        ? products
            .filter((product): product is Product => product.Type === "Explore" && product.color1 !== undefined && product.color2 !== undefined)
            .map((product) => ({
                ...product,
                color1: product.color1 || "", // Ensure color1 is always a string
                color2: product.color2 || "", // Ensure color2 is always a string
            }))
        : [];

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const [viewAll, setViewAll] = useState<boolean>(false);
    const swiperRef = useRef<any>(null);
    const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({});

    const handleNext = () => {
        if (swiperRef.current) swiperRef.current.swiper.slideNext();
    };

    const handlePrev = () => {
        if (swiperRef.current) swiperRef.current.swiper.slidePrev();
    };

    const selectColor = (productId: number, color: string) => {
        setSelectedColors((prevColors) => ({
            ...prevColors,
            [productId]: color,
        }));
    };

    const isInCart = (cartItemId: number) => cartItems.some((cartItem) => cartItem.id === cartItemId);
    const isInFavorite = (favouriteId: number) => favourites.some((favourite) => favourite.id === favouriteId);
    return (
        <section id="ExploreProducts">
            <Container>
                <span className="Explore">{t("ourProducts")}</span>
                <div className="left-side d-flex justify-content-between flex-wrap mt-3">
                    <h1 className="Today">{t("exploreOurProducts")}</h1>
                    <div className="swiper-nav-buttons">
                        <button onClick={handlePrev} className="swiper-button prev">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button onClick={handleNext} className="swiper-button next">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

                {!viewAll ? (
                    <Swiper
                        className="position-relative"
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        modules={[Grid, Navigation]}
                        breakpoints={{
                            320: { slidesPerView: 2, spaceBetween: 10, grid: { rows: 2 } },
                            768: { slidesPerView: 2, spaceBetween: 20, grid: { rows: 2 } },
                            1024: { slidesPerView: 3, spaceBetween: 30, grid: { rows: 2 } },
                            1440: { slidesPerView: 4, spaceBetween: 40, grid: { rows: 2 } },
                        }}
                        spaceBetween={30}
                        slidesPerView={4}
                        grid={{ rows: 2, fill: "row" }}
                        navigation={{ nextEl: ".swiper-button.next", prevEl: ".swiper-button.prev" }}
                    >
                        {Explore.slice(0, 8).map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="product">
                                    <div className="product-top d-flex justify-content-between">
                                        <img src={item.image} alt={item.name} />
                                        {item.salepersent ? (
                                            <span className="sale-persent" style={{ backgroundColor: "#00FF66" }}>
                                                {item.salepersent}
                                            </span>
                                        ) : (<div></div>)}
                                        <div className="icons">
                                            {
                                                IsLogin ? (
                                                    isInFavorite(item.id) ? (
                                                        <i onClick={() => dispatch(removeFavourite(item))} className="fa-solid fa-heart active"></i>
                                                    ) : (
                                                        <i onClick={() => dispatch(addFavourite(item))} className="fa-regular fa-heart"></i>
                                                    )
                                                ) : (
                                                    <Link to="/SignUp">
                                                        <i className="fa-regular fa-heart"></i>
                                                    </Link>
                                                )
                                            }
                                            {
                                                IsLogin ? (
                                                    <Link onClick={() => dispatch(getProductById(item.id))} to={`/Description/${item.id}`}>
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
                                            isInCart(item.id) ? (
                                                <div onClick={() => dispatch(removeFromCart(item))} className="RemoveCart">
                                                    <p>{t('Remove_From_Cart')}</p>
                                                </div>
                                            ) : (
                                                <div onClick={() => dispatch(addToCart(item))} className="addCart">
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
                                        <p className="product-title">{t(item.name)}</p>
                                        <div className="price d-flex">
                                            <p className="curr-price">{Convert(item.new_price)}</p>
                                            <div className="star-ctn d-flex ms-2">
                                                {renderStars(item.stars)}
                                                <span className="reviews ms-2">({item.reviews || 0})</span>
                                            </div>
                                        </div>
                                        <div className="product-bottom d-flex">
                                            <span
                                                onClick={() => selectColor(item.id, item.color1)}
                                                style={{ backgroundColor: item.color1 }}
                                                className={selectedColors[item.id] === item.color1 ? "active" : ""}
                                            ></span>
                                            <span
                                                onClick={() => selectColor(item.id, item.color2)}
                                                style={{ backgroundColor: item.color2 }}
                                                className={selectedColors[item.id] === item.color2 ? "active" : ""}
                                            ></span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <Row>
                        {Explore.map((item) => (
                            <Col lg={3} md={6} sm={6} key={item.id}>
                                <div className="product">
                                    <div className="product-top d-flex justify-content-between">
                                        <img src={item.image} alt={item.name} />
                                        {item.salepersent ? (
                                            <span className="sale-persent" style={{ backgroundColor: "#00FF66" }}>
                                                {item.salepersent}
                                            </span>
                                        ) : (<div></div>)}
                                        <div className="icons">
                                            {
                                                IsLogin ? (
                                                    isInFavorite(item.id) ? (
                                                        <i onClick={() => dispatch(removeFavourite(item))} className="fa-solid fa-heart active"></i>
                                                    ) : (
                                                        <i onClick={() => dispatch(addFavourite(item))} className="fa-regular fa-heart"></i>
                                                    )
                                                ) : (
                                                    <Link to="/SignUp">
                                                        <i className="fa-regular fa-heart"></i>
                                                    </Link>
                                                )
                                            }
                                            {
                                                IsLogin ? (
                                                    <Link onClick={() => dispatch(getProductById(item.id))} to={`/Description/${item.id}`}>
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
                                            isInCart(item.id) ? (
                                                <div onClick={() => dispatch(removeFromCart(item))} className="RemoveCart">
                                                    <p>{t('Remove_From_Cart')}</p>
                                                </div>
                                            ) : (
                                                <div onClick={() => dispatch(addToCart(item))} className="addCart">
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
                                        <p className="product-title">{t(item.name)}</p>
                                        <div className="price d-flex">
                                            <p className="curr-price">{Convert(item.new_price)}</p>
                                            <div className="star-ctn d-flex ms-2">
                                                {renderStars(item.stars)}
                                                <span className="reviews ms-2">({item.reviews || 0})</span>
                                            </div>
                                        </div>
                                        <div className="product-bottom d-flex">
                                            <span
                                                onClick={() => selectColor(item.id, item.color1)}
                                                style={{ backgroundColor: item.color1 }}
                                                className={selectedColors[item.id] === item.color1 ? "active" : ""}
                                            ></span>
                                            <span
                                                onClick={() => selectColor(item.id, item.color2)}
                                                style={{ backgroundColor: item.color2 }}
                                                className={selectedColors[item.id] === item.color2 ? "active" : ""}
                                            ></span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}

                <div className="text-center my-5">
                    <button className="View-All" onClick={() => setViewAll(!viewAll)}>
                        {viewAll ? t("back_to_swiper") : t("view_all_products")}
                    </button>
                </div>
            </Container>
        </section>
    );
};

export default ExploreProducts;
