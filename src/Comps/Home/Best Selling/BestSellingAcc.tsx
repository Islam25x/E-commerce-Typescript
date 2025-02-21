import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import Convert from "../../functions/FormatCurrncy";
import { addFavourite, removeFavourite } from "../../Redux/FavouriteSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { fetchProducts, removeFromCart, addToCart, getProductById, renderStars } from "../../Redux/CartSlice";
import { Link } from "react-router";

import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS
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
};
const BestSellingAcc = () => {

    // Fetch setBestSelling

    const dispatch = useAppDispatch();
    const cartItems: Product[] = useAppSelector((state) => state.cart.cart);
    const favourites: Product[] = useAppSelector((state) => state.favourites.favourites);
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
                <span className="Month">This Month</span>
                <div className="BestSelling-Top d-flex justify-content-between flex-wrap">
                    <h2>Best Selling Products</h2>
                    <button
                        className="View-All"
                        onClick={() => setViewAll((prev) => !prev)}
                    >
                        {viewAll ? "Back to Swiper" : "View All"}
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
                        slidesPerView={4} // Ensures proper product layout
                    >
                        {BestSellings.slice(0, 8).map((item) => ( // Ensure only 8 products fit in 2 rows
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
                                            <Link onClick={() => dispatch(getProductById(item.id))} to={`/Description/${item.id}`}>
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
                        {BestSellings.map((item) => (
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
                                            <Link onClick={() => dispatch(getProductById(item.id))} to={`/Description/${item.id}`}>
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
            </Container>
        </section>
    );
};

export default BestSellingAcc;
