import React, { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import Convert from "../../functions/FormatCurrncy";
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import { removeFavourite } from "../Redux/FavouriteSlice";
import { addToCart, removeFromCart, addAllCart } from "../Redux/CartSlice";

import "swiper/css";
import "swiper/css/navigation";
import "./Favorite.css";

// Define the type for a favorite product
type FavouriteProduct = {
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

const Favorite: React.FC = () => {
    const dispatch = useAppDispatch();

    // Retrieve favorite products and cart products from Redux store
    const FavProducts = useAppSelector((state) => state.favourites.favourites as FavouriteProduct[]);
    const CartProducts = useAppSelector((state) => state.cart.cart as FavouriteProduct[]);

    // Use Set to improve lookup performance (O(1) instead of O(n))
    const cartProductIds = useMemo(() => new Set(CartProducts.map((p) => p.id)), [CartProducts]);

    // Safely retrieve favorites from localStorage and handle potential JSON parsing errors
    const favorites: FavouriteProduct[] = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem("favourites") || "[]") as FavouriteProduct[];
        } catch (error) {
            console.error("Error parsing favourites from localStorage:", error);
            return [];
        }
    }, []);

    return (
        <section id="Favorite">
            <Container>
                <div className="Favorite-Top d-flex justify-content-between flex-wrap align-items-center">
                    <h5>Wishlist ({FavProducts.length})</h5>
                    <button className="MoveBag" onClick={() => dispatch(addAllCart())}>
                        Move All To Bag
                    </button>
                </div>

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
                    {FavProducts.map((favProduct) => (
                        <SwiperSlide key={favProduct.id}>
                            <div className="product">
                                <div className="product-top d-flex justify-content-between">
                                    <img src={favProduct.image} alt={favProduct.name} />
                                    {favProduct.Sale ? (
                                        <span className="FavProduct-persent">{favProduct.salepersent}</span>
                                    ):(
                                        <div></div>
                                    )
                                    }
                                    <div className="icons">
                                        <i
                                            className="fa-solid fa-trash"
                                            onClick={() => dispatch(removeFavourite(favProduct))}
                                        ></i>
                                    </div>
                                </div>

                                {/* Add / Remove from Cart */}
                                {cartProductIds.has(favProduct.id) ? (
                                    <div onClick={() => dispatch(removeFromCart(favProduct))} className="RemoveCart">
                                        <p>Remove from Cart</p>
                                    </div>
                                ) : (
                                    <div onClick={() => dispatch(addToCart(favProduct))} className="addCart">
                                        <p>Add To Cart</p>
                                    </div>
                                )}

                                <div className="product-des">
                                    <p className="product-title">{favProduct.name}</p>
                                    <div className="price d-flex">
                                        <p className="curr-price">{Convert(favProduct.new_price)}</p>
                                        {favProduct.old_price !== null && (
                                            <p className="prev-price">{Convert(favProduct.old_price)}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </section>
    );
};

export default Favorite;
