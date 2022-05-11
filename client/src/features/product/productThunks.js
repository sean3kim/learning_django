import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';
import axios from 'axios';

const url = 'http://localhost:8000/api'


export const getAllProduct = createAsyncThunk(
    'product/getAllProduct',
    async () => {
        const res = await axios.get(`${url}/products/`, {withCredentials: true});
        return res.data
    }
)

export const getOneProduct = createAsyncThunk(
    'product/getOneProduct',
    async (id) => {
        console.log("dispatched")
        const res = await axios.get(`${url}/products/${id}`, {withCredentials: true})
        return res.data
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id) => {
        const csrftoken = Cookie.get('csrftoken');
        const res = await axios.delete(`${url}/products/${id}/`, {withCredentials: true, headers: {'X-CSRFToken': csrftoken}})
        console.log("in delete product thunk", res.data);
        return res.data
    }
)

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (item) => {
        const csrftoken = Cookie.get('csrftoken');
        const config = {
            withCredentials: true,
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'X-CSRFToken': csrftoken
            }
        }
        let specific_url = ""
        if (item.type === 'apparel') {
            specific_url = `${url}/products/apparel/`
        } else if (item.type === 'climbing') {
            specific_url = `${url}/products/climbing/`
        }
        const res = await axios.post(`${specific_url}`, item.prod, config);
        return res.data;
    }
)

export const editProduct = createAsyncThunk(
    'product/editProduct',
    async (item) => {
        const csrftoken = Cookie.get('csrftoken');
        const config = {
            withCredentials: true,
            headers: {
                'X-CSRFToken': csrftoken
            }
        }
        let specific_url = ""
        if (item.type === 'apparel') {
            specific_url = `${url}/products/apparel/${item.id}/`
        } else if (item.type === 'climbing') {
            specific_url = `${url}/products/climbing/${item.id}/`
        }
        const res = await axios.put(`${specific_url}`, item.product, config);
        // const res = await axios.put(`${url}/products/${item.id}/`, item.product, config);
        return res.data;
    }
)