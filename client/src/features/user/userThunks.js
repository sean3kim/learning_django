import { createAsyncThunk } from '@reduxjs/toolkit';

import { setAxiosConfig } from '../../utils';
import Cookie from 'js-cookie';
import { axiosAuth } from '../../axios';
import axios from 'axios';

const url = 'http://localhost:8000/api'

/*
this thunk sends a request to server to login a user
axios interceptor will get the jwt while the final endpoint to users/login will return the user
    so that the user data can be added to redux store
*/
export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (loginCred) => {
        const config = setAxiosConfig();

        const token_auth = {username: loginCred.username, password: loginCred.password};
        const ax = axios.create();
        ax.interceptors.request.use(
            async (config) => {
                await axios.post(`${url}/token/`, token_auth, config);
                return config;
            },
            async (err) => {
                return Promise.reject(err);
            }
        )
        const res = await ax.post(`${url}/users/login/`, loginCred, config);
        return res.data;
    }
)

/**
 * so what needs to happen i think is it goes to register view to create the user
 *      but that view does not create the refresh/access tokens
 *      so on the response, use axios interceptor
 *          if no error, go get some tokens
 *              question will i have the username password inside the interceptor?
 *          if error, don't
 */
export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (loginCred) => {
        const config = setAxiosConfig();

        const token_auth = {username: loginCred.username, password: loginCred.password}
        const ax = axios.create()
        ax.interceptors.response.use(
            async (res) => {
                await axios.post(`${url}/token/`, token_auth, config);
                return res;
            },
            async (err) => {
                return Promise.reject(err);
            }
        )

        const res = await ax.post(`${url}/users/register/`, loginCred, config);
        return res.data;
    }
)

/**
 * ping the server to see if a user is currently logged in or not
 * axios interceptor will get a new access token because server authentication is based on access_token
 *      so if there is a refresh_token but no access token will fail even though user is actually logged in
 * returns user if true, error if not
 *      need to figure out how to handle the error nicely
 *      from server custom exception handler, send type of error
 */
export const getLoginStatus = createAsyncThunk(
    'users/getLoginStatus',
    async (temp, thunkAPI) => {
        const ax = axios.create()
        ax.interceptors.request.use(
            async (config) => {
                // what to do if the refresh fails? then can return some kind of false and don't need to go to final status endpoint
                try {
                    await axios.post(`${url}/token/refresh/`, {}, {withCredentials: true}).catch((err) => console.log("failed refresh", err.response))
                    return config;
                } catch (error) {
                    return Promise.reject(error);
                }
            }, (error) => {
                return Promise.reject(error);
            })

        try {
            const res = await ax.get(`${url}/users/status/`, {withCredentials: true})
            return res.data
        } catch (error) {
            // rejectWithValue will send to rejected extrareducer in slice with the value defined in rejectValue
            console.log("loginstatus error", error.response)
            let rejectValue = {
                message: error.message,
                status: error.response.status
            }
            return thunkAPI.rejectWithValue(rejectValue)
        }
    }
)

/**
 * logs out user
 * server will remove and blacklist the cookies
 */
export const logoutUser = createAsyncThunk(
    'users/logoutUser',
    async () => {
        const csrftoken = Cookie.get('csrftoken')
        await axios.post(`${url}/users/logout/`, {}, {withCredentials: true, headers: {'X-CSRFToken': csrftoken}})
        return 'logged out'
    }
)