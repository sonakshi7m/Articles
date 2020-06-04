import { API_URL } from '../constants';
const axios = require('axios');

export const userService = {
    login,
    register,
};

async function login(user) {
    const res = await axios.post(`${API_URL}users/login`, { user });
    return res;
};

async function register(user) {
    const res = await axios.post(`${API_URL}users`, { user });
    return res;
}
