import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAxiosConfig } from '../../utils';
import axios from 'axios';
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
    async (data) => {
        const config = setAxiosConfig();
        const res = await axiosAuth.post(`${url}/orders/item/`, data, config)
        return res.data
        // need active order id
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