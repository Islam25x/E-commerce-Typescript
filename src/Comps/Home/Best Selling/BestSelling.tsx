import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import Convert from "../../functions/FormatCurrncy";
import { addFavourite, removeFavourite } from "../../Redux/FavouriteSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { fetchProducts, removeFromCart, addToCart, getProductById, renderStars } from "../../Redux/CartSlice";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'swiper/swiper-bundle.css';
import "./BestSelling.css";

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
}
const BestSelling = () => {
    const { t } = useTranslation();

    // Fetch setBestSelling

    const dispatch = useAppDispatch();
    const cartItems: Product[] = useAppSelector((state) => state.cart.cart);
    const favourites: Product[] = useAppSelector((state) => state.favourites.favourites);
    const IsLogin = useAppSelector((state) => state.user.IsLogin)
    const { products } = useAppSelector((state) => state.cart);
    const BestSellings: Product[] = products ? products.filter((product) => product.Type === 'BestSelling') : [];
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    const isInCart = (cartItemId: number) => cartItems.some((cartItem) => cartItem.id === cartItemId);
    const isInFavorite = (favouriteId: number) => favourites.some((favourite) => favourite.id === favouriteId);

    // State for viewAll

    const [viewAll, setViewAll] = useState(false);

    return (
        <section id="BestSelling">
            <Container>
                <span className="Month">{t('this_month')}</span>
                <div className="BestSelling-Top d-flex justify-content-between flex-wrap">
                    <h2>{t('best_selling_products')}</h2>
                    <button
                        className="View-All"
                        onClick={() => setViewAll((prev) => !prev)}
                    >
                        {viewAll ? t('back_to_swiper') : t('view_all')}
                    </button>
                </div>
                {!viewAll ? (
                    <Swiper
                        className="position-relative"
                        breakpoints={{
                            320: { slidesPerView: 2, spaceBetween: 10 },
                            768: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                            1440: { slidesPerView: 4, spaceBetween: 40 },
                        }}
                        spaceBetween={40}
                        slidesPerView={4}
                    >
                        {BestSellings.map((BestSelling) => (
                            <SwiperSlide key={BestSelling.id}>
                                <div className="product">
                                    <div className="product-top d-flex justify-content-between">
                                        <img src={BestSelling.image} alt={t(BestSelling.name)} />
                                        <div></div>
                                        <div className="icons">
                                            {
                                                IsLogin ? (
                                                    isInFavorite(BestSelling.id) ? (
                                                        <i onClick={() => dispatch(removeFavourite(BestSelling))} className="fa-solid fa-heart active"></i>
                                                    ) : (
                                                        <i onClick={() => dispatch(addFavourite(BestSelling))} className="fa-regular fa-heart"></i>
                                                    )
                                                ) : (
                                                    <Link to="/SignUp">
                                                        <i className="fa-regular fa-heart"></i>
                                                    </Link>
                                                )
                                            }
                                            {
                                                IsLogin ? (
                                                    <Link onClick={() => dispatch(getProductById(BestSelling.id))} to={`/Description/${BestSelling.id}`}>
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
                                            isInCart(BestSelling.id) ? (
                                                <div onClick={() => dispatch(removeFromCart(BestSelling))} className="RemoveCart">
                                                    <p>{t('Remove_From_Cart')}</p>
                                                </div>
                                            ) : (
                                                <div onClick={() => dispatch(addToCart(BestSelling))} className="addCart">
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
                                        <p className="product-title">{t(BestSelling.name)}</p>
                                        <div className="price d-flex">
                                            <p className="curr-price">
                                                {Convert(BestSelling.new_price)}
                                            </p>
                                            {BestSelling.old_price !== null && (
                                                <p className="prev-price">{Convert(BestSelling.old_price)}</p>
                                            )}
                                        </div>
                                        <div className="star-ctn d-flex">
                                            {renderStars(BestSelling.stars)}
                                            <span className="reviews ms-2">
                                                ({BestSelling.reviews || 0})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <Row>
                        {BestSellings.map((BestSelling) => (
                            <Col lg={3} md={6} sm={6} key={BestSelling.id}>
                                <div className="product">
                                    <div className="product-top d-flex justify-content-between">
                                        <img src={BestSelling.image} alt={t(BestSelling.name)} />
                                        <div></div>
                                        <div className="icons">
                                            {
                                                IsLogin ? (
                                                    isInFavorite(BestSelling.id) ? (
                                                        <i onClick={() => dispatch(removeFavourite(BestSelling))} className="fa-solid fa-heart active"></i>
                                                    ) : (
                                                        <i onClick={() => dispatch(addFavourite(BestSelling))} className="fa-regular fa-heart"></i>
                                                    )
                                                ) : (
                                                    <Link to="/SignUp">
                                                        <i className="fa-regular fa-heart"></i>
                                                    </Link>
                                                )
                                            }
                                            {
                                                IsLogin ? (
                                                    <Link onClick={() => dispatch(getProductById(BestSelling.id))} to={`/Description/${BestSelling.id}`}>
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
                                            isInCart(BestSelling.id) ? (
                                                <div onClick={() => dispatch(removeFromCart(BestSelling))} className="RemoveCart">
                                                    <p>{t('Remove_From_Cart')}</p>
                                                </div>
                                            ) : (
                                                <div onClick={() => dispatch(addToCart(BestSelling))} className="addCart">
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
                                        <p className="product-title">{t(BestSelling.name)}</p>
                                        <div className="price d-flex">
                                            <p className="curr-price">
                                                {Convert(BestSelling.new_price)}
                                            </p>
                                            {BestSelling.old_price !== null && (
                                                <p className="prev-price">{Convert(BestSelling.old_price)}</p>
                                            )}
                                        </div>
                                        <div className="star-ctn d-flex">
                                            {renderStars(BestSelling.stars)}
                                            <span className="reviews ms-2">
                                                ({BestSelling.reviews || 0})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </section>
    );
};

export default BestSelling;
