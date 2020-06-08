import { API_URL } from '../constants';
import { authHeader } from '../helpers';
const axios = require('axios');

export const feedService = {
    globalFeeds,
    userFeeds,
    singleFeed,
    tags,
    createArticle,
    deleteArticle,
    comments,
    postComment,
    deleteComment,
    markAsFavorite
};

async function globalFeeds(payload) {
    const res = await axios.get(`${API_URL}articles`, { params: payload });
    return res;
};

async function userFeeds(payload) {
    const res = await axios.get(`${API_URL}articles/feed`, { params: payload });
    return res;
};

async function singleFeed(payload) {
    const res = await axios.get(`${API_URL}articles/${payload}`);
    return res;
};

async function tags() {
    const res = await axios.get(`${API_URL}tags`);
    return res;
};

async function createArticle(payload) {

    let axiosConfig = {
        headers: authHeader()
    };

    const res = await axios.post(`${API_URL}articles`, { article: payload }, axiosConfig);
    return res;
};

async function deleteArticle(payload) {

    let axiosConfig = {
        headers: authHeader()
    };

    const res = await axios.delete(`${API_URL}articles/${payload}`, axiosConfig);
    return res;
};

async function comments(payload) {

    let axiosConfig = {
        headers: authHeader()
    };

    const res = await axios.get(`${API_URL}articles/${payload}/comments`, axiosConfig);
    return res;
}

async function postComment(payload) {

    let axiosConfig = {
        headers: authHeader()
    };

    const res = await axios.post(`${API_URL}articles/${payload.slug}/comments`, payload.comment, axiosConfig);
    return res;
}

async function deleteComment(payload) {

    let axiosConfig = {
        headers: authHeader()
    };

    const res = await axios.delete(`${API_URL}articles/${payload.slug}/comments/${payload.commentId}`, axiosConfig);
    return res;
}

async function markAsFavorite(payload) {
    let axiosConfig = {
        headers: authHeader()
    };

    if (payload.type === 'post') {
        const res = await axios.post(`${API_URL}articles/${payload.slug}/favorite`, null, axiosConfig);
        return res;
    } else {
        const res = await axios.delete(`${API_URL}articles/${payload.slug}/favorite`, axiosConfig);
        return res;
    }

}