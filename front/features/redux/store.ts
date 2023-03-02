import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import { storage } from './storage';
import { vehicleReducer } from "./vehicle-slice";
import { userReducer } from "./user-slice";
import { driverReducer } from "./driver-slice";
import { MaintenanceReducer } from "./maintence";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    vehicle: vehicleReducer,
    user: userReducer,
    driver: driverReducer,
    maintenance: MaintenanceReducer
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