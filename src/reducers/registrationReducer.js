import { userConstants } from '../constants';

let initialState = {
    user: {},
    loading: false,
    error: null
}

export function registration(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { ...state, loading: true };
        case userConstants.REGISTER_SUCCESS:
            return { ...state, user: action.payload, error: null, loading: false };
        case userConstants.REGISTER_FAILURE:
            return { ...state, user: null, error: action.payload, loading: false };
        default:
            return state
    }
}