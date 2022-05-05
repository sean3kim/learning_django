import { createSlice } from '@reduxjs/toolkit';
import { getAllApparel, getOneApparel, deleteApparel, addApparel, editApparel } from './apparelThunks';

const initialState = {
    apparelById: {},
    apparelAllId: [],
}

export const apparelSlice = createSlice({
    name: 'apparel',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllApparel.fulfilled, (state, action) => {
                // turning an array of objects [ {} {} {} ]
                // into object of objects { id: {}, id: {}, id: {}}
                // state.apparelById = action.payload.map((item) => item)
                let newState = {};
                action.payload.forEach((item) => {
                    newState[item.id] = item;
                })
                state.apparelById = newState;
                state.apparelAllId = action.payload.map((item) => item.id)
                return state
            })
        builder
            .addCase(getOneApparel.fulfilled, (state, action) => {
                const id = action.payload.id;
                state.apparelById[id] = action.payload;
                
                if (!state.apparelAllId.includes(id)) {
                    state.apparelAllId.push(id);
                }
                return state
            })
        builder
            .addCase(deleteApparel.fulfilled, (state, action) => {
                console.log("delete slice action payload", action.payload)
                const id = action.payload.id;
                delete state.apparelById[id]
                state.apparelAllId = state.apparelAllId.filter((i) => i !== id)
                return state
            })
        builder
            .addCase(addApparel.fulfilled, (state, action) => {
                console.log("add apparel action payload", action.payload);
                state.apparelById[action.payload.id] = action.payload;
                state.apparelAllId.push(action.payload.id);
                return state
            })
        builder
            .addCase(editApparel.fulfilled, (state, action) => {
                console.log("edit apparel action payload", action.payload);
                state.apparelById[action.payload.id] = action.payload;
                return state;
            })
    } 
})

export default apparelSlice.reducer