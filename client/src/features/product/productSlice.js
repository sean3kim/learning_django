import { createSlice } from '@reduxjs/toolkit';
import { getAllProduct, getOneProduct, deleteProduct, addProduct, editProduct } from './productThunks';

const initialState = {
    byId: {},
    allIds: [],
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.fulfilled, (state, action) => {
                // turning an array of objects [ {} {} {} ]
                // into object of objects { id: {}, id: {}, id: {}}
                // state.byId = action.payload.map((item) => item)
                let newState = {};
                action.payload.forEach((item) => {
                    newState[item.id] = item;
                })
                state.byId = newState;
                state.allIds = action.payload.map((item) => item.id)
                return state
            })
        builder
            .addCase(getOneProduct.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.byId[id] = action.payload;
                
                if (!state.allIds.includes(id)) {
                    state.allIds.push(id);
                }
                return state
            })
        builder
            .addCase(deleteProduct.fulfilled, (state, action) => {
                console.log("delete slice action payload", action.payload)
                const id = action.payload.id;
                delete state.byId[id]
                state.allIds = state.allIds.filter((i) => i !== id)
                return state
            })
        builder
            .addCase(addProduct.fulfilled, (state, action) => {
                console.log("add product action payload", action.payload);
                state.byId[action.payload.id] = action.payload;
                state.allIds.push(action.payload.id);
                return state
            })
        builder
            .addCase(editProduct.fulfilled, (state, action) => {
                console.log("edit product action payload", action.payload);
                state.byId[action.payload.id] = action.payload;
                return state;
            })
    } 
})

export default productSlice.reducer