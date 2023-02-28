import React from 'react';
import { redirect } from 'react-router';
export function getAuthKey() {
    const userKey = localStorage.getItem('user_key');
    console.log("User Key : " + userKey);
    if (!userKey) {
        return null;
    }
    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return userKey;
}

export function tokenLoader() {
    return getAuthKey();
}
export function checkAuthLoader() {
    const token = getAuthKey();
    if (!token) {
        return redirect('/');
    }
    return token;
}
export function getTokenDuration() {
    const storedExperationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExperationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    console.log("Login duratoin time " + duration);
    return duration;
}