import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, registerUser, getLoginStatus } from './userThunks';

const initialState = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const {username, email} = action.payload
            state = {
                username,
                email,
                firstName: action.payload.first_name,
                lastName: action.payload.last_name,
                isLoggedIn: true
            }
            return state
        })
        builder
            .addCase(getLoginStatus.fulfilled, (state, action) => {
                const {username, email} = action.payload
                state = {
                    username,
                    email,
                    firstName: action.payload.first_name,
                    lastName: action.payload.last_name,
                    isLoggedIn: true
                }
                return state

            })
            .addCase(getLoginStatus.rejected, (state, action) => {
                state = initialState;
                console.log("action.payload", action.payload)
                return state;
            })
        builder
            .addCase(logoutUser.fulfilled, (state, action) => {
                state = initialState;
                return state;
            })
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                const {username, email} = action.payload
                state = {
                    username,
                    email,
                    firstName: action.payload.first_name,
                    lastName: action.payload.last_name,
                    isLoggedIn: true
                }
                return state;
            })
    }
})


export default userSlice.reducer