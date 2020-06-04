import { userConstants } from '../constants';

let initialState = {
    user: null,
    loading: false,
    error: null
}

export function login(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return { ...state, loading: true };
        case userConstants.LOGIN_SUCCESS:
            return { ...state, user: action.payload, error: null, loading: false };
        case userConstants.LOGIN_FAILURE:
            return { ...state, user: null, error: action.payload, loading: false };
        case userConstants.SET_LOGIN_USER:
            return { ...state, user: action.payload, error: null, loading: false }
        case userConstants.LOGOUT:
            return { ...state, initialState }
        default:
            return state
    }
}