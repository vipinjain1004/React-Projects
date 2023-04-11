import React from 'react';
import { redirect } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import {authenticationAction} from '../store/ReduxAuthentication';
export function action() {
    const dispatch = useDispatch();
    dispatch(authenticationAction.logout());
    localStorage.removeItem('user_key');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user_name');
    return redirect('/');
}





