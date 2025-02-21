import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { fetchProducts } from "../../Redux/CartSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { renderStars } from "../../Redux/CartSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import Convert from "../../functions/FormatCurrncy";
import { Link } from "react-router-dom";
import { Swiper as SwiperClass } from "swiper";

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
    const [viewAll, setViewAll] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    // Fetch products from Redux store
    const { products } = useAppSelector((state) => state.cart);
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

    // Define swiper reference with correct type
    const swiperRef = useRef<SwiperClass | null>(null);
    const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({});

    // Handle Swiper navigation
    const handleNext = () => swiperRef.current?.slideNext();
    const handlePrev = () => swiperRef.current?.slidePrev();

    // Handle color selection
    const selectColor = (productId: number, color: string) => {
        setSelectedColors((prevColors) => ({
            ...prevColors,
            [productId]: color,
        }));
    };

    return (
        <section id="ExploreProducts">
            <Container>
                <span className="Explore">Our Products</span>
                <div className="left-side d-flex justify-content-between flex-wrap mt-3">
                    <h1 className="Today">Explore Our Products</h1>
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
                                            <Link to="/SignUp">
                                                <i className="fa-regular fa-heart"></i>
                                            </Link>
                                            <Link to="/SignUp">
                                                <i className="fa-regular fa-eye"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Link to="/SignUp" className="addCart">
                                        <p>Add To Cart</p>
                                    </Link>
                                    <div className="product-des">
                                        <p className="product-title">{item.name}</p>
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
                                            <Link to="/SignUp">
                                                <i className="fa-regular fa-heart"></i>
                                            </Link>
                                            <Link to="/SignUp">
                                                <i className="fa-regular fa-eye"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Link to="/SignUp" className="addCart">
                                        <p>Add To Cart</p>
                                    </Link>
                                    <div className="product-des">
                                        <p className="product-title">{item.name}</p>
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
                        {viewAll ? "Back to Swiper" : "View All Products"}
                    </button>
                </div>
            </Container>
        </section>
    );
};

export default ExploreProducts;
