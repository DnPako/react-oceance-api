import * as actionTypes from '../actions/actions';
import {AuthActionType, IAuthState} from '../types';
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

// TODO: Figure out error type
let authFail: (state: IAuthState, {error}: any) => IAuthState;
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
            return authFail(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action.token);
        case actionTypes.AUTH_LOGOUT:
            return logout(state);

        default:
            return state;
    }
};

export default reducer;