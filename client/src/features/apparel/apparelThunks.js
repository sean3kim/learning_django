import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';
import axios from 'axios';

const url = 'http://localhost:8000/api'


export const getAllApparel = createAsyncThunk(
    'apparel/getAllApparel',
    async () => {
        const res = await axios.get(`${url}/products/apparel/`, {withCredentials: true});
        return res.data
    }
)

export const getOneApparel = createAsyncThunk(
    'apparel/getOneApparel',
    async (id) => {
        console.log("dispatched")
        const res = await axios.get(`${url}/products/apparel/${id}`, {withCredentials: true})
        return res.data
    }
)

export const deleteApparel = createAsyncThunk(
    'apparel/deleteApparel',
    async (id) => {
        const csrftoken = Cookie.get('csrftoken');
        const res = await axios.delete(`${url}/products/apparel/${id}/`, {withCredentials: true, headers: {'X-CSRFToken': csrftoken}})
        console.log("in delete apparel thunk", res.data);
        return res.data
    }
)

export const addApparel = createAsyncThunk(
    'apparel/addApparel',
    async (item) => {
        const csrftoken = Cookie.get('csrftoken');
        const config = {
            withCredentials: true,
            headers: {
                'X-CSRFToken': csrftoken
            }
        }
        const res = await axios.post(`${url}/products/apparel/`, item, config);
        return res.data;
    }
)

export const editApparel = createAsyncThunk(
    'apparel/editApparel',
    async (item) => {
        const csrftoken = Cookie.get('csrftoken');
        const config = {
            withCredentials: true,
            headers: {
                'X-CSRFToken': csrftoken
            }
        }
        const res = await axios.put(`${url}/products/apparel/${item.id}/`, item.apparel, config);
        return res.data;
    }
)