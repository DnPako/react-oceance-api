import * as actionTypes from "./actions";
import {ActionCreator, Dispatch} from "redux";
import axios from '../../axios-config';
import {ISuccessAction, IErrorAction, IAuthenticationData, Error} from '../types';

const URL_SIGNUP = '/auth/register';
const URL_SIGNIN = '/auth/login';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess: ActionCreator<ISuccessAction> = (token: string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token
    }
};

export const authFail: ActionCreator<IErrorAction> = (error: Error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

let saveToken: (token: string) => void;
saveToken = (token) => {
    // TODO: add expiration from the given header
    const expirationDate = new Date(
        new Date().getTime() + actionTypes.EXPIRATION_TIME
    );

    localStorage.setItem('token', token);
    // @ts-ignore
    localStorage.setItem('expirationDate', expirationDate);
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const logoutAfterDateExpires = (expiresIn: number = actionTypes.EXPIRATION_TIME) => {
    return (dispatch: Dispatch<any>) => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn)
    }
};

// Can be register or login
export const authenticate = (dataToSend: IAuthenticationData, isSignUp: boolean) => {
    let URL = URL_SIGNIN;

    if (isSignUp) URL = URL_SIGNUP;

    return async (dispatch: Dispatch<any>) => {
        dispatch(authStart());
        try {
            const {data} = await axios.post(URL, dataToSend);

            saveToken(data.token);

            dispatch(authSuccess(data.token));
            dispatch(logoutAfterDateExpires());
        } catch (error) {
            const receivedError = <Error>error.response.data.error;
            dispatch(authFail(receivedError));
        }
    }
};

