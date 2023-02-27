import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import { storage } from './storage';
import { carReducer } from "./car-slice";
import { userReducer } from "./user-slice";
import { driverReducer } from "./driver-slice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    car: carReducer,
    user: userReducer,
    driver: driverReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    })
}

export const store = makeStore();
export const persistor = persistStore(store)