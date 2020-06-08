import { combineReducers } from 'redux';

import { registration } from './registrationReducer';
import { login, profile } from './loginReducer';
import { tag, globalFeeds, userFeeds, createArticle, singleFeed, deleteArticle, comments } from './feedReducer';

const rootReducer = combineReducers({
    registration,
    login,
    tag,
    globalFeeds,
    userFeeds,
    singleFeed,
    createArticle,
    deleteArticle,
    comments,
    profile,
    //favoriteArticle
    //postComment
});

export default rootReducer;