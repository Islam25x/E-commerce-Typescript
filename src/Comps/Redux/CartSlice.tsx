import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

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
    Bcategory: string
};

type InitialCartState = {
    totalPrice: number;
    cart: CartProduct[];
    isLoading: boolean;
    error: boolean | string;
    products: CartProduct[];
    categories: string[]
    favourites: CartProduct[];
    isProductInCart: boolean;
    selectedProduct?: CartProduct | null;
    filteredProducts?: CartProduct[] | string | null;
};

const initialCartState: InitialCartState = {
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    favourites: JSON.parse(localStorage.getItem("favourites") || "[]"),
    totalPrice: 0,
    isLoading: false,
    error: false,
    products: [],
    categories: [],
    isProductInCart: false,
    selectedProduct: null,
    filteredProducts: null,
};

// Fetch products asynchronously
export const fetchProducts = createAsyncThunk("cart/fetchProducts", async () => {
    const response = await fetch("Assets/all_product.json");
    const products = await response.json();
    return products;
});

const CartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartProduct>) => {
            const existingProduct = state.cart.find((product) => product.id === action.payload.id);
            if (!existingProduct) {
                state.cart.push({ ...action.payload, quantity: 1 });
                state.totalPrice += action.payload.new_price;
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        },
        removeFromCart: (state, action: PayloadAction<CartProduct>) => {
            state.cart = state.cart.filter((product) => product.id !== action.payload.id);
            state.totalPrice -= action.payload.new_price * (action.payload.quantity || 1);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        increaseProduct: (state, action: PayloadAction<CartProduct>) => {
            const product = state.cart.find((item) => item.id === action.payload.id);
            if (product) {
                product.quantity++;
                state.totalPrice += action.payload.new_price;
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        },
        decreaseProduct: (state, action: PayloadAction<CartProduct>) => {
            const product = state.cart.find((item) => item.id === action.payload.id);
            if (product && product.quantity > 1) {
                product.quantity--;
                state.totalPrice -= action.payload.new_price;
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        },
        getProductById: (state, action: PayloadAction<number>) => {
            state.selectedProduct = state.products.find((product) => product.id === action.payload) || null;
        },
        getProductByName: (state, action: PayloadAction<string>) => {
            const productName = action.payload;
            state.filteredProducts = state.products.filter(
                (product) => product.name === productName
            );
        },
        getProductByCategory: (state, action: PayloadAction<string>) => {
            const category = action.payload;
            state.filteredProducts = state.products.filter(
                (product) => product.category === category
            );
        },
        getProductByBrowseCategory: (state, action: PayloadAction<string>) => {
            const Bcategory = action.payload;
            state.filteredProducts = state.products.filter(
                (product) => product.Bcategory === Bcategory
            );
        },
        addAllCart: (state) => {
            const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

            if (favourites.length > 0) {
                favourites.forEach((favouriteItem: CartProduct) => {
                    const isInCart = state.cart.some((cartItem) => cartItem.id === favouriteItem.id);
                    if (!isInCart) {
                        state.cart.push({ ...favouriteItem, quantity: 1 });
                        state.totalPrice += favouriteItem.new_price;
                    }
                });
            }

            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        setProductInCart: (state, action: PayloadAction<number>) => {
            state.isProductInCart = state.cart.some((product) => product.id === action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Failed to fetch product";
        });
    },
});

export // Render stars function
    const renderStars = (stars) => {
        const fullStars = Math.floor(stars);
        const halfStar = stars % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className="stars">
                {Array.from({ length: fullStars }, (_, i) => (
                    <i key={`full-${i}`} className="fas fa-star"></i>
                ))}
                {halfStar && <i className="fas fa-star-half-alt"></i>}
                {Array.from({ length: emptyStars }, (_, i) => (
                    <i key={`empty-${i}`} className="far fa-star"></i>
                ))}
            </div>
        );
    };

export const {
    addToCart,
    removeFromCart,
    increaseProduct,
    decreaseProduct,
    getProductById,
    addAllCart,
    setProductInCart,
    getProductByName,
    getProductByCategory,
    getProductByBrowseCategory
} = CartSlice.actions;

export default CartSlice.reducer;
