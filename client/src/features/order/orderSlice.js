import { createSlice } from '@reduxjs/toolkit';

import { getActiveOrder, addItem, editItem, removeItem, addAddress } from './orderThunks'
import { loginUser, getLoginStatus } from '../user/userThunks';

const initialState = {
    order: null,
    items: [],
    address: {
        id: '',
        address: '',
        state: '',
        city: '',
        zip: '',
    },
    errorMessage: '',
}

/**
 * what do i want in this slice
 * all orders by id
 * current active order maybe
 * items separate from within the order to avoid deep nested state?
 * 
 * ok new idea:
 *      have order but within order just ids of order items
 *      have a separate slice for order items? or no it could just be the apparel/climbing slices
 *      to get specific items in an order:
 *          access the order in question, then go through the list of item ids and pull them from apparel/climbing slices
 */
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getActiveOrder.fulfilled, (state, action) => {
                const { items, ...rest } = action.payload;
                if (items && rest) {
                    state.items = items;
                    state.order = rest;
                    state.errorMessage = '';
                }
                return state;
            })
        builder
            .addCase(addItem.fulfilled, (state, action) => {
                state.items = [...state.items, action.payload];
                state.errorMessage = '';
                return state;
            })
            .addCase(addItem.rejected, (state, action) => {
                state.errorMessage = action.payload;
                return state;
            })
        builder
            .addCase(editItem.fulfilled, (state, action) => {
                state.items = state.items.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                })
                state.errorMessage = '';
                return state;
            })
            .addCase(editItem.rejected, (state, action) => {
                if (Array.isArray(action.payload)) {
                    state.errorMessage = action.payload.toString();
                } else {
                    state.errorMessage = action.payload;
                }
                return state;
            })
        builder
            .addCase(removeItem.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload)
                state.errorMessage = '';
                return state
            })
        builder
            .addCase(addAddress.fulfilled, (state, action) => {
                console.log('add address action payload', action.payload)
                // update address in state
                const {customer_related, order, ...add} = action.payload;
                state.address = { ...add };
                return state;
            })
            .addCase(addAddress.rejected, (state, action) => {
                console.log('add address rejected action payload', action.payload);
                state.errorMessage = action.payload.toString();
                return state;
            })
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                // when a user logs in the response from server contains user details as well as list of orders, and within orders order items
                // *** maybe can change this to just get the active order if any
                //      if the user wants to look at previous orders, can grab them on that page load
                if (action.payload.order) {
                    const { items, ...rest } = action.payload.order;
                    if (items && rest) {
                        state.items = items;
                        state.order = rest;
                    }
                }
                return state;
            })
        builder
            .addCase(getLoginStatus.fulfilled, (state, action) => {
                if (action.payload.order) {
                    const { items, ...rest } = action.payload.order;
                    if (items && rest) {
                        state.items = items;
                        state.order = rest;
                    }
                }
                return state;
            })
    }
})

export default orderSlice.reducer;