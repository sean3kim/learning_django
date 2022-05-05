import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import apparelReducer from '../features/apparel/apparelSlice';
import orderReducer from '../features/order/orderSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        apparel: apparelReducer,
        order: orderReducer,
    },
})