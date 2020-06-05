import { userConstants } from '../constants';

let initialState = {
    user: null,
    loading: false,
    error: null
}

let profileInitialState = {
    profile: null,
    error: null,
    loading: false
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
            return { ...state, ...initialState }
        default:
            return state
    }
}

export function profile(state = profileInitialState, action) {
    switch (action.type) {
        case userConstants.FETCH_PROFILE_REQUEST:
            return { ...state, loading: true };
        case userConstants.FETCH_PROFILE_SUCCESS:
            return { ...state, profile: action.payload.profile, error: null, loading: false };
        case userConstants.FETCH_PROFILE_FAILURE:
            return { ...state, profile: null, error: action.payload, loading: false };
        case userConstants.FOLLOW_USER_REQUEST:
            return { ...state, loading: false };
        case userConstants.FOLLOW_USER_SUCCESS:
            return { ...state, profile: action.payload.profile, error: null, loading: false };
        case userConstants.FOLLOW_USER_FAILURE:
            return { ...state, error: action.payload, loading: false };
        default:
            return state
    }
}

