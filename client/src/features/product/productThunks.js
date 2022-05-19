import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAxiosConfig } from '../../utils';

const url = 'http://localhost:8000/api'


export const getAllProduct = createAsyncThunk(
    'product/getAllProduct',
    async () => {
        const res = await axios.get(`${url}/products/`, {withCredentials: true});
        return res.data;
    }
)

export const getOneProduct = createAsyncThunk(
    'product/getOneProduct',
    async (id) => {
        const res = await axios.get(`${url}/products/${id}`, {withCredentials: true})
        return res.data
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id) => {
        const config = setAxiosConfig();
        const res = await axios.delete(`${url}/products/${id}/`, config)
        return res.data
    }
)

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (item) => {
        const config = setAxiosConfig();

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
        const config = setAxiosConfig();

        let specific_url = ""
        if (item.type === 'apparel') {
            specific_url = `${url}/products/apparel/${item.id}/`
        } else if (item.type === 'climbing') {
            specific_url = `${url}/products/climbing/${item.id}/`
        }
        const res = await axios.put(`${specific_url}`, item.product, config);
        return res.data;
    }
)