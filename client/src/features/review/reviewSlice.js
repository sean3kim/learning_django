import { createSlice } from '@reduxjs/toolkit';
import { getAllProduct } from '../product/productThunks';

const initialState = {
    byId: {},
    allIds: [],
}

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.fulfilled, (state, action) => {
                // get reviews from all the products and add to state
                let newById = {};
                let newAllIds = [];
                action.payload.forEach((product) => {
                    product.reviews.forEach((review) => {
                        newById[review.id] = review;
                        newAllIds.push(review.id);
                    })
                })
                state.byId = newById;
                state.allIds = newAllIds;
                return state;
            })
    }
})

export default reviewSlice.reducer;