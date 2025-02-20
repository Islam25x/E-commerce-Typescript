import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import Convert from "../../../functions/FormatCurrncy";
import { useCart } from "../../Context/CartContext";
import { useFavorite } from "../../Context/FavoriteContext";
import { Link } from "react-router";
import axios from "axios";

const Suggest = () => {
// Fetch setSuggestProduct Sales
const [Suggest, setBestSuggest] = useState([]);

useEffect(() => {
    const fetchSales = async () => {
    try {
        const response = await axios.get("Assets/all_product.json");
        const randomItems = response.data
        .sort(() => 0.5 - Math.random())
        .slice(0, 7);
        console.log("Suggest fetched:", randomItems);
        setBestSuggest(randomItems);
    } catch (error) {
        console.error("Error fetching Suggest:", error);
    }
    };
    fetchSales();
}, []);
// State for viewAll
const [viewAll, setViewAll] = useState(false);
// stars
const { renderStars, desProduct, AddCart, Cart, RemoveCart, IsAdded } =
    useCart();
const { AddFavorite, RemoveFavorite, IsAddedFav } = useFavorite();

return (
    <section id="Suggest">
    <Container>
    <div className="Suggest d-flex justify-content-between flex-wrap align-items-center">
        <span className='for-u'>Just For You</span>
        <button
            className="View-All"
            onClick={() => setViewAll((prev) => !prev)}
        >
            {viewAll ? "Back to Swiper" : "See All"}
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
{Suggest.map((SuggestProduct) => (
    <SwiperSlide key={SuggestProduct.id}>
    <div className="product">
        <div className="product-top d-flex justify-content-between">
        <img src={SuggestProduct.image} alt={SuggestProduct.name} />
        <span></span>
        <div className="icons">
            {IsAddedFav(SuggestProduct) ? (
            <i
                className="fa-regular fa-heart active"
                onClick={() => RemoveFavorite(SuggestProduct)}
            ></i>
            ) : (
            <i
                className="fa-regular fa-heart"
                onClick={() => AddFavorite(SuggestProduct)}
            ></i>
            )}
            <Link
            onClick={() => desProduct(SuggestProduct)}
            to={`/Description/${SuggestProduct.id}`}
            >
            <i className="fa-regular fa-eye"></i>
            </Link>
        </div>
        </div>
        {IsAdded(SuggestProduct) ? (
        <div
            onClick={() => RemoveCart(SuggestProduct)}
            className="RemoveCart"
        >
            <p>Remove from Cart</p>
        </div>
        ) : (
        <div
            onClick={() => AddCart(SuggestProduct)}
            className="addCart"
        >
            <p>Add To Cart</p>
        </div>
        )}
        <div className="product-des">
        <p className="product-title">{SuggestProduct.name}</p>
        <div className="price d-flex">
            <p className="curr-price">
            {Convert(SuggestProduct.new_price)}
            </p>
            {typeof SuggestProduct.old_price === "number" && (
                <p className="prev-price">
                {Convert(SuggestProduct.old_price)}
                </p>
            )}
        </div>
        {/* Render Stars */}
        <div className="star-ctn d-flex">
            {renderStars(SuggestProduct.stars)}
            <span className="reviews ms-2">
            ({SuggestProduct.reviews || 0})
            </span>
        </div>
        </div>
    </div>
    </SwiperSlide>
))}
        </Swiper>
        ) : (
        <Row>
   {Suggest.map((SuggestProduct) => (
    <Col lg={3} md={6} sm={6} key={SuggestProduct.id}>
    <div className="product">
        <div className="product-top d-flex justify-content-between">
        <img src={SuggestProduct.image} alt={SuggestProduct.name} />
        <span></span>
        <div className="icons">
            {IsAddedFav(SuggestProduct) ? (
            <i
                className="fa-regular fa-heart active"
                onClick={() => RemoveFavorite(SuggestProduct)}
            ></i>
            ) : (
            <i
                className="fa-regular fa-heart"
                onClick={() => AddFavorite(SuggestProduct)}
            ></i>
            )}
            <Link
            onClick={() => desProduct(SuggestProduct)}
            to={`/Description/${SuggestProduct.id}`}
            >
            <i className="fa-regular fa-eye"></i>
            </Link>
        </div>
        </div>
        {IsAdded(SuggestProduct) ? (
        <div
            onClick={() => RemoveCart(SuggestProduct)}
            className="RemoveCart"
        >
            <p>Remove from Cart</p>
        </div>
        ) : (
        <div
            onClick={() => AddCart(SuggestProduct)}
            className="addCart"
        >
            <p>Add To Cart</p>
        </div>
        )}
        <div className="product-des">
        <p className="product-title">{SuggestProduct.name}</p>
        <div className="price d-flex">
            <p className="curr-price">
            {Convert(SuggestProduct.new_price)}
            </p>
            {typeof SuggestProduct.old_price === "number" && (
                <p className="prev-price">
                {Convert(SuggestProduct.old_price)}
                </p>
            )}
        </div>
        {/* Render Stars */}
        <div className="star-ctn d-flex">
            {renderStars(SuggestProduct.stars)}
            <span className="reviews ms-2">
            ({SuggestProduct.reviews || 0})
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

export default Suggest;

