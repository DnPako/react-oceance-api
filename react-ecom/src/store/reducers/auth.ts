import * as actionTypes from '../actions/actions';
import {AuthActionType, IAuthState, Error} from '../types';
import {Reducer} from "redux";

const initialState: IAuthState = {
    token: '',
    error: null,
    loading: false
};

let authStart: (state: IAuthState) => IAuthState;
authStart = (state) => {
    return {
        ...state,
        loading: true,
        error: null
    }
};

let authFail: (state: IAuthState, error: Error) => IAuthState;
authFail = (state, error) => {
    return {
        ...state,
        loading: false,
        error
    }
};

let authSuccess: (state: IAuthState, token: string) => IAuthState;
authSuccess = (state, token) => {
    return {
        ...state,
        loading: false,
        token
    }
};

let logout: (state: IAuthState) => IAuthState;
logout = (state) => {
    return {
        ...state,
        loading: false,
        token: '',
    }
};

// Add action type
const reducer: Reducer<IAuthState> = (state: IAuthState = initialState, action) => {
    switch ((action as AuthActionType).type) {
        case actionTypes.AUTH_START:
            return authStart(state);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action.error);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action.token);
        case actionTypes.AUTH_LOGOUT:
            return logout(state);

        default:
            return state;
    }
};

export default reducer;