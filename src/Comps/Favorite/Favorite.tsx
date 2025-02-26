import { useMemo , useEffect } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import Convert from "../functions/FormatCurrncy";
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import { removeFavourite } from "../Redux/FavouriteSlice";
import { addToCart, removeFromCart, addAllCart } from "../Redux/CartSlice";
import { useTranslation } from "react-i18next";

import 'swiper/swiper-bundle.css';
import "./Favorite.css";

// تعريف نوع المنتج المفضل
type FavouriteProduct = {
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

const Favorite: React.FC = () => {
    const { t , i18n } = useTranslation();
    const dispatch = useAppDispatch();


    const FavProducts = useAppSelector((state) => state.favourites.favourites as FavouriteProduct[]);
    const CartProducts = useAppSelector((state) => state.cart.cart as FavouriteProduct[]);


    const cartProductIds = useMemo(() => new Set(CartProducts.map((p) => p.id)), [CartProducts]);
    useEffect(() => {
        document.getElementById("Favorite")?.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
    }, [i18n.language]);

    return (
        <section id="Favorite">
            <Container>
                <div className="Favorite-Top d-flex justify-content-between flex-wrap align-items-center">
                    <h5>{t("wishlist")} ({FavProducts.length})</h5>
                    <button className="MoveBag" onClick={() => dispatch(addAllCart())}>
                        {t("moveAllToBag")}
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
                                    <img src={favProduct.image} alt={t(favProduct.name)} />
                                    {favProduct.Sale ? (
                                        <span className="FavProduct-persent">{favProduct.salepersent}</span>
                                    ) : (
                                        <div></div>
                                    )}
                                    <div className="icons">
                                        <i
                                            className="fa-solid fa-trash"
                                            onClick={() => dispatch(removeFavourite(favProduct))}
                                        ></i>
                                    </div>
                                </div>

                                {/* إضافة / إزالة من السلة */}
                                {cartProductIds.has(favProduct.id) ? (
                                    <div onClick={() => dispatch(removeFromCart(favProduct))} className="RemoveCart">
                                        <p>{t("Remove_From_Cart")}</p>
                                    </div>
                                ) : (
                                    <div onClick={() => dispatch(addToCart(favProduct))} className="addCart">
                                        <p>{t("add_to_cart")}</p>
                                    </div>
                                )}

                                <div className="product-des">
                                    <p className="product-title">{t(favProduct.name)}</p>
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
