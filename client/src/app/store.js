import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import productReducer from '../features/product/productSlice';
import orderReducer from '../features/order/orderSlice';
import reviewReducer from '../features/review/reviewSlice';

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    review: reviewReducer,
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // blacklist: ['order'],
    // whitelist: ['product'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }),
})

export const persistor = persistStore(store);