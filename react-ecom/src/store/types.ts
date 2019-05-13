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

export interface IErrorAction extends Action {
    type: string;
    error: any;
}

export type AuthActionType = ISuccessAction | IErrorAction