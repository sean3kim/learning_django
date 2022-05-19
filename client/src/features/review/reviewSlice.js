import { createSlice } from '@reduxjs/toolkit';
import { getAllProduct, getOneProduct } from '../product/productThunks';

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
        builder
            .addCase(getOneProduct.fulfilled, (state, action) => {
                // getting reviews for one product if it is not in the store
                // in case other products are in the store with other reviews, need to preserve those and just add the new ones
                let newById = {...state.byId};
                let newAllIds = [];
                action.payload.reviews.forEach((review) => {
                    newById[review.id] = review;
                    newAllIds.push(review.id);
                })
                state.byId = {...state.byId, ...newById};
                state.allIds = [...state.allIds, ...newAllIds];
                return state;
            })
    }
})

export default reviewSlice.reducer;