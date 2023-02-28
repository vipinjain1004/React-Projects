import React from 'react';
import { redirect } from 'react-router-dom';
export function action(){
    localStorage.removeItem('user_key');
    localStorage.removeItem('expiration');
    return redirect('/');
}