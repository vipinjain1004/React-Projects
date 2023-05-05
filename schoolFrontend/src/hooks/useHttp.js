import React, { useCallback, useReducer, } from 'react';

const initialValues = {
    isLoading: false,
    method: null,
    body: null,
    header: null,
    data: null,
    error: null,
    url: null
}

const httpReducer = (currHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return {
                isLoading: true,
                data: null,
                error: null
            }     
        case 'CLEAR':
            return initialValues;
        case 'RESPONSE':
            return {
                isLoading: false,
                data: action.responseData,
                error: null
            }

        case 'ERROR':
            return {
                isLoading: true,
                data: null,
                error: action.error
            }

        default:
            break;
    }
}

function useHttp() {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialValues);
    const sendRequest = callBack((url, mehtod, header, body) => {
        dispatchHttp({ type: 'SEND' });
        const response = await fetch(url, {
            method: method,
            header: { ...header, 'content-type': 'application/json' },
            body: body
        }
        )
        if (!response.ok) {
            dispatchHttp({ type: 'ERROR', data: null, error: 'Something went wrong !' });
        } else {
            dispatchHttp({ type: 'RESPOSNE', data: response });
            return response.json();
        }
    });

    const clearData = useCallback(() => {
        dispatchHttp({ type: 'CLEAR' });
    });

    return {
        isLoading: httpState.isLoading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        id: httpState.id,
        clear: clearData
    };
}