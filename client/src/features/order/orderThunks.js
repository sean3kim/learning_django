import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAxiosConfig } from '../../utils';
import { axiosAuth } from '../../axios';

const url = 'http://localhost:8000/api'

export const getActiveOrder = createAsyncThunk(
    'order/getActiveOrder',
    async () => {
        let config = setAxiosConfig();
        const res = await axiosAuth.get(`${url}/orders/active/`, config);
        return res.data;
    }
)

export const addItem = createAsyncThunk(
    'order/addItem',
    async (data, thunkAPI) => {
        const config = setAxiosConfig();

        try {
            const res = await axiosAuth.post(`${url}/orders/item/`, data, config)
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const editItem = createAsyncThunk(
    'order/editItem',
    async (updateData) => {
        const config = setAxiosConfig();
        console.log('updatedata in edititem thunk', updateData)
        const res = await axiosAuth.put(`${url}/orders/item/${updateData.id}/`, updateData.data, config);
        return res.data
    }
)

export const removeItem = createAsyncThunk(
    'order/removeItem',
    async (id) => {
        const config = setAxiosConfig();
        await axiosAuth.delete(`${url}/orders/item/${id}/`, config);
        return id;
    }
)