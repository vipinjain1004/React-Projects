import React from 'react';
import {createSlice,configureStore} from '@reduxjs/toolkit';


const initialState = {isLoggedIn: false, token:'', userId :''}
const authenticationSlice = createSlice({
    name : 'authentication',
    initialState,
    reducers:{
        login(state, action){
            state.isLoggedIn = true;
            state.token = action.payload.payload.token;
            state.userName = action.payload.payload.userName;
            console.log(action);
        },
        logout(state){
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
            localStorage.removeItem('userName');
            state.isLoggedIn = false;
            state.userId = '';
            state.token = '';
            state.userName = '';
        }
    }

});

const store = configureStore({
    reducer : {
        authentication : authenticationSlice.reducer
    }
});

export const authenticationAction =  authenticationSlice.actions;
export default store;