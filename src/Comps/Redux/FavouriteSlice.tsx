import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

type InitialFavouritesState = {
    favourites: FavouriteProduct[];
    isLoading: boolean;
    error: boolean | string;
};

const initialState: InitialFavouritesState = {
    favourites: JSON.parse(localStorage.getItem("favourites") || "[]"),
    isLoading: false,
    error: false,
};

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        addFavourite: (state, action: PayloadAction<FavouriteProduct>) => {
            state.favourites.push(action.payload);
            localStorage.setItem("favourites", JSON.stringify(state.favourites));
        },
        removeFavourite: (state, action: PayloadAction<FavouriteProduct>) => {
            state.favourites = state.favourites.filter((product) => product.id !== action.payload.id);
            localStorage.setItem("favourites", JSON.stringify(state.favourites));
        },
    },
});

export const { addFavourite, removeFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
