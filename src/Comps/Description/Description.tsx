import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Convert from "../../functions/FormatCurrncy";
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import {
  addToCart,
  increaseProduct,
  decreaseProduct,
  removeFromCart,
  getProductById,
} from "../Redux/CartSlice";
import { addFavourite , removeFavourite } from "../Redux/FavouriteSlice";
import "./Description.css";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  new_price: number;
  InStock: boolean;
  count?: number;
  color1?: string;
  color2?: string;
  pices: number;
}

const Description: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({});

  const handleSizeChange = (size: string) => setSelectedSize(size);

  const product = useAppSelector((state) =>
    state.cart.products.find((p: Product) => p.id === parseInt(productId))
  );
  const cartItems = useAppSelector((state) => state.cart.cart);
  const favourites: Product[] = useAppSelector((state) => state.favourites.favourites);
  const isInCart = (id: number) => cartItems.some((item) => item.id === id);
  const IsAddedFav =  (id: number) => favourites.some((item) => item.id === id);


  useEffect(() => {
    if (!product) dispatch(getProductById(Number(productId)));
  }, [dispatch, productId, product]);

  if (!product) return <div>Product not found</div>;

  const selectColor = (productId: number, color: string) => {
    setSelectedColors((prevColors) => ({ ...prevColors, [productId]: color }));
  };

  const cartProduct = cartItems.find((item) => item.id === product.id);
  const quantity = cartProduct ? cartProduct.quantity : 0;

  return (
    <section id="product-description">
      <Container>
        <p className="Path">
          Home / {product.category} / <span className="text-dark">{product.name}</span>
        </p>
        <Row>
          <Col lg={2} md={2} sm={4}>
            <div className="Album">
              {[...Array(4)].map((_, index) => (
                <div className={`photo photo${index + 1}`} key={index}>
                  <img src={product.image} alt={product.name} />
                </div>
              ))}
            </div>
          </Col>
          <Col lg={5} md={5} sm={8}>
            <div className="center-photo">
              <img src={product.image} alt={product.name} />
            </div>
          </Col>
          <Col lg={5} md={5} sm={8}>
            <div className="product-content" style={{ marginTop: "1rem" }}>
              <h3>{product.name}</h3>
              <div className="star-ctn d-flex">
                <span className="count ms-2">({product.pices || 0})</span>
                <span className="count ms-2" style={{ color: product.pices > 0 ? "green" : "red" }}>
                  {product.pices > 0 ? " | In Stock" : " | Out of Stock"}
                </span>
              </div>
              <h3 className="mt-3">{Convert(product.new_price)}</h3>
              <p className="description mt-3">{product.description}</p>
              <hr />
              <div className="Colors d-flex">
                <h6>Colors:</h6>
                {[product.color1, product.color2].map(
                  (color, index) =>
                    color && (
                      <span
                        key={index}
                        onClick={() => selectColor(product.id, color)}
                        style={{ backgroundColor: color }}
                        className={selectedColors[product.id] === color ? "active" : ""}
                      ></span>
                    )
                )}
              </div>
              <div className="size d-flex mt-3 mb-2">
                <h6 className="mt-2">Size:</h6>
                <ul className="d-flex" style={{ marginLeft: "-2rem" }}>
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <li key={size} onClick={() => handleSizeChange(size)} className={selectedSize === size ? "active" : ""}>
                      {size}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cart d-flex">
                <div className="count d-flex">
                  {
                    isInCart(product.id) ? (
                      <>
                        <button className="minus" disabled={quantity === 1} onClick={() => dispatch(decreaseProduct(product))}>
                        <i className="fa-solid fa-minus"></i>
                        </button>
                        <span>{quantity}</span>
                        <button className="plus" onClick={() => dispatch(increaseProduct(product))}>
                          <i className="fa-solid fa-plus"></i>
                        </button>   
                      </>
                    ):
                    (
                      <>
                    <button className="disabledMinus" disabled={true} onClick={() => dispatch(decreaseProduct(product))}>
                    <i className="fa-solid fa-minus"></i>
                    </button>
                    <span>{quantity}</span>
                    <button className="disabledPlus"  disabled={true} onClick={() => dispatch(increaseProduct(product))}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                      </>
                    )
                  }
                </div>
                <button
                  className="Buy mx-2"
                  style={{ background: isInCart(product.id) ? "green" : undefined }}
                  onClick={() => dispatch(isInCart(product.id) ? removeFromCart(product) : addToCart(product))}
                >
                  {isInCart(product.id) ? "In Cart" : "Buy Now"}
                </button>
                <div className="heart">
                  {IsAddedFav(product.id) ? (
                    <i
                      className="fa-regular fa-heart active"
                      onClick={() => dispatch(removeFavourite(product))}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-heart"
                      onClick={() =>dispatch(addFavourite(product))}
                    ></i>
                  )}
                  </div>
              </div>
              <div className="des-bottom">
                <div className="first d-flex">
                  <div className="icon">
                    <i className="fa-solid fa-truck-fast"></i>
                  </div>
                  <div className="first-des">
                    <h6>Free Delivery</h6>
                    <p>Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
                <div className="sec d-flex">
                  <div className="icon">
                    <i className="fa-solid fa-rotate"></i>
                  </div>
                  <div className="sec-des">
                    <h6>Return Delivery</h6>
                    <p>Free 30 Days Delivery Returns. <a href="#">Details</a></p>
                  </div>
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
