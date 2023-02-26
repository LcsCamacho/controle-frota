import { configureStore } from "@reduxjs/toolkit";
import { carReducer } from "./car-slice";
import { userReducer } from "./user-slice";

export const store = configureStore({
    reducer: {
        car: carReducer,
        user: userReducer
    },
});