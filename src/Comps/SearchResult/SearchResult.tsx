import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Convert from "../functions/FormatCurrncy";
import NavHomeAcc from "../nav/navHomeAcc";
import { getProductByName } from "../Redux/CartSlice";
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import { addFavourite, removeFavourite } from "../Redux/FavouriteSlice";
import { addToCart, removeFromCart, renderStars } from "../Redux/CartSlice";

import '../Home/ExploreProducts/ExploreProducts.css'

type CartProduct = {
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
  Bcategory: string;
};

const SearchResult = () => {
  const { productIdentifier } = useParams();
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>({});

  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.cart) || [];
  const favouriteProducts = useAppSelector((state) => state.favourites.favourites) || [];
  const filteredProducts = useAppSelector((state) => state.cart.filteredProducts) || [];

  useEffect(() => {
    if (productIdentifier) {
      dispatch(getProductByName(productIdentifier));
    }
  }, [productIdentifier, dispatch]);

  const isAddedToCart = (productId: number) => cartProducts.some((p) => p.id === productId);
  const isAddedToFavourite = (productId: number) => favouriteProducts.some((p) => p.id === productId);

  const selectColor = (productId: number, color: string) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [productId]: color,
    }));
  };

  return (
    <section id="SearchResult">
      <NavHomeAcc />
      <section id="CategoryProducts">
        <Container>
          <Row>
            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
              filteredProducts.map((product: CartProduct) => (
                <Col lg={3} md={6} sm={12} key={product.id}>
                  <div className="product">
                    <div className="product-top d-flex justify-content-between">
                      <img src={product.image} alt={product.name} />
                      <div className="icons">
                        <i
                          className={`fa-regular fa-heart ${isAddedToFavourite(product.id) ? "active" : ""}`}
                          onClick={() =>
                            isAddedToFavourite(product.id)
                              ? dispatch(removeFavourite(product))
                              : dispatch(addFavourite(product))
                          }
                        ></i>
                        <Link to={`/Description/${product.id}`}>
                          <i className="fa-regular fa-eye"></i>
                        </Link>
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        isAddedToCart(product.id)
                          ? dispatch(removeFromCart(product))
                          : dispatch(addToCart(product))
                      }
                      className={isAddedToCart(product.id) ? "RemoveCart" : "addCart"}
                    >
                      <p>{isAddedToCart(product.id) ? "Remove from Cart" : "Add To Cart"}</p>
                    </div>
                    <div className="product-des">
                      <p className="product-title">{product.name}</p>
                      <div className="price d-flex">
                        <p className="curr-price">{Convert(product.new_price)}</p>
                        {product.old_price !== null && (
                          <p className="prev-price">{Convert(product.old_price)}</p>
                        )}
                      </div>
                      <div className="star-ctn d-flex">
                        {renderStars(product.stars)}
                        <span className="reviews ms-2">({product.reviews || 0})</span>
                      </div>
                      <div className="product-bottom d-flex mt-2">
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
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <div className="text-center mt-4">No products found matching "{productIdentifier}"</div>
            )}
          </Row>

        </Container>
      </section>
    </section>
  );
};

export default SearchResult;
