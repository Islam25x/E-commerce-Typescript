import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import CartSliceReducer from "./CartSlice";
import FavouriteSliceReducer from "./FavouriteSlice";
import userReducer from "./LoginSystem/UserSlice";
import storage from "redux-persist/lib/storage"; // Uses localStorage for persistence
import { persistReducer, persistStore } from "redux-persist";

// 🔹 Configure persistence settings
const persistConfig = {
    key: "root", // Root key for storage
    storage, // Define storage type (localStorage)
    whitelist: ["user", "cart", "favourites"], // Only persist these slices
};

// 🔹 Combine all reducers
const rootReducer = combineReducers({
    cart: CartSliceReducer,
    user: userReducer,
    favourites: FavouriteSliceReducer,
});

// 🔹 Apply `persistReducer` to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Configure Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"], // Ignore persistence actions for serializability check
            },
        }),
});

// 🔹 Initialize Redux Persist for state persistence
export const persistor = persistStore(store);

// ✅ Define types for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Create typed hooks for use throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
