import axios from 'axios';

export const ax = axios.create({
    baseURL: 'http://localhost:8000/api/',
})

export const axiosAuth = axios.create({
    baseURL: 'http://localhost:8000/api/',
})


axiosAuth.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            // have the originalConfig._retry so that an infinite loop does not occur
            // err.config/originalConfig has ._retry set to true initially so it will go in the below condition for the first time
            // if the request to refresh fails, the second time around ._retry will be false and will fail
            if (err.response.status === 401 && originalConfig._retry) {
                originalConfig._retry = false;
                try {
                    // need to send {refresh: <refresh token>} to this url in order to get a new access token
                    // how to get the refresh token value if it is in httponly cookie?
                    //     django will read the httponly cookies on server side so no need to send any data here
                    await axiosAuth.post('token/refresh/', {}, {withCredentials: true});
                    return axiosAuth(originalConfig);
                } catch (error) {
                    return Promise.reject(error);    
                }
            }
        }
        return Promise.reject(err)
    }
)
