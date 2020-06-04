import { toastrConstants } from '../constants';

export const toastrActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: toastrConstants.SUCCESS, message };
}

function error(message) {
    return { type: toastrConstants.ERROR, message };
}

function clear() {
    return { type: toastrConstants.CLEAR };
}