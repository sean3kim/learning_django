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
    async (updateData, thunkAPI) => {
        const config = setAxiosConfig();

        try {
            const res = await axiosAuth.put(`${url}/orders/item/${updateData.id}/`, updateData.data, config);
            // const res = await axiosAuth.put(`${url}/orders/item/99/`, updateData.data, config);
            return res.data
        } catch (error) {
            // if i catch 404, breaks app because cartpage is updating cart after mount
            //      BUT with strict mode on cartpage updates cart twice, the first one is blocked by isMounted flag
            //          but second one goes through with initial invalid data
            // BUT what if a real 404 comes up?
            if (error.response.data.status_code !== 404) {
                return thunkAPI.rejectWithValue(error.response.data)    
            }
        }
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

export const addAddress = createAsyncThunk(
    'order/addAddress',
    async (add, thunkAPI) => {
        const config = setAxiosConfig();
        try {
            const res = await axiosAuth.post(`${url}/orders/address/`, add, config);
            console.log('server response data', res.data)
            return res.data;
        } catch (error) {
            console.log('caught error in thunk', error.response.data)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)