import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Convert from "../functions/FormatCurrncy";
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import {
  addToCart,
  increaseProduct,
  decreaseProduct,
  removeFromCart,
  getProductById,
} from "../Redux/CartSlice";
import { useTranslation } from "react-i18next";
import { addFavourite, removeFavourite } from "../Redux/FavouriteSlice";
import "./Description.css";
import '../Home/FlashSales/FlashSales.css'
import '../Home/ExploreProducts/ExploreProducts.css'

// تعريف نوع المنتج لتجنب الأخطاء
interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  InStock: boolean;
  Sale: boolean;
  Type: string;
  category: string;
  color1?: string | null;
  color2?: string | null;
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

const Description: React.FC = () => {
  const { productId } = useParams<{ productId?: string }>(); // إضافة `?` لجعلها اختيارية
  const productIdNum = productId ? Number(productId) : null;

  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({});

  const handleSizeChange = (size: string) => setSelectedSize(size);

  const product = useAppSelector((state) =>
    state.cart.products.find((p: Product) => p.id === productIdNum)
  );

  const cartItems = useAppSelector((state) => state.cart.cart as Product[]);
  const favourites = useAppSelector((state) => state.favourites.favourites as Product[]);

  const isInCart = (id: number) => cartItems.some((item) => item.id === id);
  const isAddedToFav = (id: number) => favourites.some((item) => item.id === id);

  useEffect(() => {
    if (!product && productIdNum !== null) {
      dispatch(getProductById(productIdNum));
    }
  }, [dispatch, productIdNum, product]);

  if (!product) return <div>{t("ProductNotFound")}</div>;

  const selectColor = (productId: number, color: string) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [productId]: color,
    }));
  };

  const cartProduct = cartItems.find((item) => item.id === product.id);
  const quantity = cartProduct ? cartProduct.quantity : 0;

  return (
    <section id="product-description">
      <Container>
        <p className="Path" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
          {t("Home")} / {t(`categories.${product.category}`)} /{" "}
          <span className="text-dark">{t(product.name)}</span>
        </p>
        <Row>
          <Col lg={2} md={2} sm={4}>
            <div className="Album">
              {[...Array(4)].map((_, index) => (
                <div className={`photo photo${index + 1}`} key={index}>
                  <img src={product.image} alt={t(product.name)} />
                </div>
              ))}
            </div>
          </Col>
          <Col lg={5} md={5} sm={8}>
            <div className="center-photo">
              <img src={product.image} alt={t(product.name)} />
            </div>
          </Col>
          <Col lg={5} md={5} sm={8}>
            <div className="product-content" style={{ marginTop: "1rem" }}>
              <h3>{t(product.name)}</h3>
              <div className="star-ctn d-flex">
                <span className="count ms-2">({product.pices || 0})</span>
                <span
                  className="count ms-2"
                  style={{ color: product.pices > 0 ? "green" : "red" }}
                >
                  {product.pices > 0 ? ` | ${t("InStock")}` : ` | ${t("OutOfStock")}`}
                </span>
              </div>
              <h3 className="mt-3">{Convert(product.new_price)}</h3>
              <p className="description mt-3">{t(product.description)}</p>
              <hr />
              <div className="Colors d-flex">
                <h6>{t("Colors")}:</h6>
                {[product.color1, product.color2].map((color, index) =>
                  color ? (
                    <span
                      key={index}
                      onClick={() => selectColor(product.id, color)}
                      style={{ backgroundColor: color }}
                      className={selectedColors[product.id] === color ? "active" : ""}
                    ></span>
                  ) : null
                )}
              </div>
              <div className="size d-flex mt-3 mb-2">
                <h6 className="mt-2">{t("Size")}:</h6>
                <ul className="d-flex" style={{ marginLeft: "-2rem" }}>
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <li
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={selectedSize === size ? "active" : ""}
                    >
                      {size}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cart d-flex">
                <div className="count d-flex">
                  {isInCart(product.id) ? (
                    <>
                      <button
                        className="minus"
                        disabled={quantity === 1}
                        onClick={() => dispatch(decreaseProduct(product))}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span>{quantity}</span>
                      <button className="plus" onClick={() => dispatch(increaseProduct(product))}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="disabledMinus" disabled={true}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span>{quantity}</span>
                      <button className="disabledPlus" disabled={true}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="Buy mx-2"
                  style={{ background: isInCart(product.id) ? "green" : undefined }}
                  onClick={() =>
                    dispatch(isInCart(product.id) ? removeFromCart(product) : addToCart(product))
                  }
                >
                  {isInCart(product.id) ? t("InCart") : t("buyNow")}
                </button>
                <div className="heart">
                  {isAddedToFav(product.id) ? (
                    <i
                      className="fa-regular fa-heart active"
                      onClick={() => dispatch(removeFavourite(product))}
                    ></i>
                  ) : (
                    <i className="fa-regular fa-heart" onClick={() => dispatch(addFavourite(product))}></i>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Description;
