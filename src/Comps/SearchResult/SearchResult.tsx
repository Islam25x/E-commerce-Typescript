import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Convert from "../../functions/FormatCurrncy";
import NavHomeAcc from "../nav/navHomeAcc";
import { getProductByName } from "../Redux/CartSlice";
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import { addFavourite, removeFavourite } from "../Redux/FavouriteSlice";
import { addToCart, removeFromCart , renderStars } from "../Redux/CartSlice";

// Define renderStars function (if it's not imported from elsewhere)
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
};
const SearchResult = () => {
  const { productIdentifier } = useParams();
  const [selectedColors, setSelectedColors] = useState({});

  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.cart);
  const favouriteProducts = useAppSelector((state) => state.favourites.favourites);
  const filteredProducts = useAppSelector((state) => state.cart.filteredProducts);

  useEffect(() => {
    if (productIdentifier) {
      // Dispatch the action to fetch products by name (if necessary)
      dispatch(getProductByName(productIdentifier));
    }
  }, [productIdentifier, dispatch]);

  const isAddedToCart = (catProduct: CartProduct) =>
    cartProducts.some((cartProduct) => cartProduct.id === catProduct.id);

  const isAddedToFavourite = (catProduct: CartProduct) =>
    favouriteProducts.some((favouriteProduct) => favouriteProduct.id === catProduct.id);

  const selectColor = (productId: number, color: string) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [productId]: color,
    }));
  };

  const AddFavorite = (product: CartProduct) => {
    dispatch(addFavourite(product));
  };

  const RemoveFavorite = (product: CartProduct) => {
    dispatch(removeFavourite(product));
  };

  const AddCart = (product: CartProduct) => {
    dispatch(addToCart(product));
  };

  const RemoveCart = (product: CartProduct) => {
    dispatch(removeFromCart(product));
  };

  return (
    <section id="SearchResult">
      <NavHomeAcc />
      <section id="CategoryProducts">
        <Container>
          <Row>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product: CartProduct) => (
                <Col lg={3} md={6} sm={12} key={product.id}>
                  <div className="product">
                    <div className="product-top d-flex justify-content-between">
                      <img src={product.image} alt={product.name} />
                      <span></span>
                      <div className="icons">
                        {isAddedToFavourite(product) ? (
                          <i
                            className="fa-regular fa-heart active"
                            onClick={() => RemoveFavorite(product)}
                          ></i>
                        ) : (
                          <i
                            className="fa-regular fa-heart"
                            onClick={() => AddFavorite(product)}
                          ></i>
                        )}
                        <Link to={`/Description/${product.id}`}>
                          <i className="fa-regular fa-eye"></i>
                        </Link>
                      </div>
                    </div>
                    {isAddedToCart(product) ? (
                      <div onClick={() => RemoveCart(product)} className="RemoveCart">
                        <p>Remove from Cart</p>
                      </div>
                    ) : (
                      <div onClick={() => AddCart(product)} className="addCart">
                        <p>Add To Cart</p>
                      </div>
                    )}
                    <div className="product-des">
                      <p className="product-title">{product.name}</p>
                      <div className="price d-flex">
                        <p className="curr-price">{Convert(product.new_price)}</p>
                        {typeof product.old_price === "number" && (
                          <p className="prev-price">{Convert(product.old_price)}</p>
                        )}
                      </div>
                      <div className="star-ctn d-flex">
                        {renderStars(product.stars)}
                        <span className="reviews ms-2">({product.reviews || 0})</span>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <div>No products found matching "{productIdentifier}"</div>
            )}
          </Row>
        </Container>
      </section>
    </section>
  );
};

export default SearchResult;
