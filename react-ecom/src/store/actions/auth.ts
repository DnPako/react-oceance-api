import * as actionTypes from "./actions";
import {ActionCreator, Dispatch} from "redux";
import axios from '../../axios-config';
import {ISuccessAction, IErrorAction, IAuthenticationData} from '../types';

const URL_SIGNUP = '/auth/register';
const URL_SIGNIN = '/auth/login';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

// TODO: ADD TYPE TO DATA
export const authSuccess: ActionCreator<ISuccessAction> = (token: string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token
    }
};

// TODO: ADD TYPE TO ERROR
export const authFail: ActionCreator<IErrorAction> = (error: any) => {
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
// TODO: ADD TOKEN
export const authenticate = (dataToSend: IAuthenticationData, isSignUp: boolean) => {
    let URL = URL_SIGNIN;

    if (isSignUp) URL = URL_SIGNUP;

    return async (dispatch: Dispatch<any>) => {
        dispatch(authStart());

        try {
            let {data} = await axios.post(URL, dataToSend);
            console.log(data);
            data = '';

            dispatch(authSuccess(data));
            dispatch(logoutAfterDateExpires());
        } catch (error) {
            dispatch(authFail(error));
        }
    }
};

