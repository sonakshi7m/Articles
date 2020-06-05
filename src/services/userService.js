import { API_URL } from '../constants';
import { authHeader } from '../helpers';
const axios = require('axios');


export const userService = {
    login,
    logout,
    register,
    fetchProfile,
    followUser
};

async function login(user) {
    const res = await axios.post(`${API_URL}users/login`, { user });
    return res;
};

function logout() {
    localStorage.removeItem('user');
};

async function register(user) {
    const res = await axios.post(`${API_URL}users`, { user });
    return res;
}

async function fetchProfile(payload) {
    const res = await axios.get(`${API_URL}profiles/${payload}`);
    return res;
}

async function followUser(payload) {
    let axiosConfig = {
        headers: authHeader()
    };

    if (payload.type === 'post') {
        const res = await axios.post(`${API_URL}profiles/${payload.username}/follow`, null, axiosConfig);
        return res;
    } else {
        const res = await axios.delete(`${API_URL}profiles/${payload.username}/follow`, axiosConfig);
        return res;
    }

}