import React from 'react';
import {createSlice,configureStore} from '@reduxjs/toolkit';


const initialState = {isLoggedIn: false, token:'', userId :''}
const authenticationSlice = createSlice({
    name : 'authentication',
    initialState,
    reducers:{
        login(state, action){
            state.isLoggedIn = true;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.userName = action.payload.payload;
            console.log(action);
        },
        logout(state){
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