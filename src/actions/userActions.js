import { userConstants } from '../constants';

export const userActions = {
    login,
    logout,
    register,
    setLoginUser,
    fetchProfile
};

function login(user) {
    return { type: userConstants.LOGIN_REQUEST, payload: user }
}

function register(user) {
    return { type: userConstants.REGISTER_REQUEST, payload: user }
}

export function sendingRequest(sending) {
    return { type: userConstants.SENDING_REQUEST, sending }
}

export function requestError(error) {
    return { type: userConstants.REQUEST_ERROR, error }
}

export function logout() {
    return { type: userConstants.LOGOUT }
}

export function setLoginUser(user) {
    return { type: userConstants.SET_LOGIN_USER, payload: user }
}

export function fetchProfile(payload) {
    return { type: userConstants.FETCH_PROFILE_REQUEST, payload }
}

export function followUser(payload) {
    return { type: userConstants.FOLLOW_USER_REQUEST, payload }
}