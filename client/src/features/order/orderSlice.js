import { createSlice } from '@reduxjs/toolkit';

import { loginUser, getLoginStatus } from '../user/userThunks';

const initialState = {
    byId: {},
    allIds: [],
    active: {},
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
            .addCase(loginUser.fulfilled, (state, action) => {
                // when a user logs in the response from server contains user details as well as list of orders, and within orders order items
                // *** maybe can change this to just get the active order if any
                //      if the user wants to look at previous orders, can grab them on that page load
                const orders = action.payload.order;
                console.log("orders slice orders", orders)
                let newState = {};
                orders.forEach((order) => {
                    newState[order.id] = order;
                })
                state.byId = newState;
                state.allIds = orders.map((order) => order.id);
                return state;
            })
        builder
            .addCase(getLoginStatus.fulfilled, (state, action) => {
                const orders = action.payload.order;
                let newState = {};
                orders.forEach((order) => {
                    newState[order.id] = order;
                })
                state.byId = newState;
                state.allIds = orders.map((order) => order.id);
                return state;
            })
    }
})

export default orderSlice.reducer;