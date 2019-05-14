import {Action} from "redux";

export interface IAuthenticationData {
    email: string;
    password: string;
}

export interface IAuthState {
    token: string;
    error: any;
    loading: boolean;
}

export interface ISuccessAction extends Action {
    type: string;
    token: string;
}

export type Error = {
    message: string;
    status: number;
}

export interface IErrorAction extends Action {
    type: string;
    error: Error;
}

export type AuthActionType = ISuccessAction | IErrorAction