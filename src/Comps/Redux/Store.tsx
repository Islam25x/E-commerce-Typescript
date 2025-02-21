import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import CartSliceReducer from "./CartSlice";
import FavouriteSliceReducer from "./FavouriteSlice";
import userReducer from "./LoginSystem/UserSlice";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Configure Persist Storage
const persistConfig = {
    key: "Users", // Storage key
    storage,
};

// Combine Reducers
const rootReducer = combineReducers({
    cart: CartSliceReducer, 
    user: userReducer, 
    favourites: FavouriteSliceReducer,  
});

// Apply persistReducer to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
    reducer: persistedReducer, // Fix: persist reducer should be passed here
});

// Persistor for Redux Persist
export const persistor = persistStore(store);

// Define Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create Typed Hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
