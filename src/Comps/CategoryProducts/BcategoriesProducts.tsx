import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Convert from "../../functions/FormatCurrncy";
import { Link, useParams } from "react-router-dom";
import NavHomeAcc from "../nav/navHomeAcc";
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import { addToCart, removeFromCart, renderStars, getProductByBrowseCategory } from "../Redux/CartSlice";
import { addFavourite, removeFavourite } from "../Redux/FavouriteSlice";

// Define types for the selected colors and CartProduct
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
    Bcategory:string
};

const BcategoryProducts = () => {
    const { BcategoryProducts } = useParams<{ BcategoryProducts: string }>();
    const dispatch = useAppDispatch();

    // Get the products from Redux state
    const { products, isLoading, error } = useAppSelector((state) => state.cart);
    const cartProducts = useAppSelector((state) => state.cart.cart);
    const favouriteProducts = useAppSelector((state) => state.favourites.favourites);

    // Fetch products by category
    useEffect(() => {
        if (BcategoryProducts) {
            dispatch(getProductByBrowseCategory(BcategoryProducts));
        }
    }, [BcategoryProducts, dispatch]);

    // Filter products by the category
    const catProducts = products.filter((product) => product.Bcategory === BcategoryProducts);
    console.log(catProducts);


    // Check if a product is in the cart or favourites
    const isAddedToCart = (catProduct: CartProduct) =>
        cartProducts.some((cartProduct) => cartProduct.id === catProduct.id);
    const isAddedToFavourite = (catProduct: CartProduct) =>
        favouriteProducts.some((favouriteProduct) => favouriteProduct.id === catProduct.id);

    // Handling loading, error, and empty state
    if (isLoading) {
        return (
            <section id="CategoryProducts">
                <p className="text-center">Loading products...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section id="CategoryProducts">
                <p className="text-center">Error: {error}</p>
            </section>
        );
    }

    if (catProducts.length === 0) {
        return (
            <section id="CategoryProducts">
                <p className="text-center">No products found in this category.</p>
            </section>
        );
    }

    return (
        <>
            <NavHomeAcc />
            <section id="CategoryProducts">
                <Container>
                    <h1 className="mt-5">{BcategoryProducts}</h1>
                    <Row>
                        {catProducts.map((catProduct) => (
                            <Col lg={3} md={6} sm={6} key={catProduct.id}>
                                <div className="product">
                                    <div className="product-top d-flex justify-content-between">
                                        <img src={catProduct.image} alt={catProduct.name} />
                                        <div className="icons">
                                            {/* Favorite icon */}
                                            <i
                                                className={`fa-regular fa-heart ${isAddedToFavourite(catProduct) ? "active" : ""}`}
                                                onClick={() =>
                                                    isAddedToFavourite(catProduct)
                                                        ? dispatch(removeFavourite(catProduct))
                                                        : dispatch(addFavourite(catProduct))
                                                }
                                            ></i>
                                            {/* View product icon */}
                                            <Link to={`/Description/${catProduct.id}`}>
                                                <i className="fa-regular fa-eye"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* Cart action */}
                                    {isAddedToCart(catProduct) ? (
                                        <div onClick={() => dispatch(removeFromCart(catProduct))} className="RemoveCart">
                                            <p>Remove from Cart</p>
                                        </div>
                                    ) : (
                                        <div onClick={() => dispatch(addToCart(catProduct))} className="addCart">
                                            <p>Add To Cart</p>
                                        </div>
                                    )}
                                    {/* Product description */}
                                    <div className="product-des">
                                        <p className="product-title">{catProduct.name}</p>
                                        <div className="price d-flex">
                                            <p className="curr-price">{Convert(catProduct.new_price)}</p>
                                            {catProduct.old_price && <p className="prev-price">{Convert(catProduct.old_price)}</p>}
                                        </div>
                                        <div className="star-ctn d-flex">
                                            {renderStars(catProduct.stars)}
                                            <span className="reviews ms-2">({catProduct.reviews || 0})</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default BcategoryProducts;
