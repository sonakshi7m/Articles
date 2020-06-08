import { put, takeLatest, call, all } from 'redux-saga/effects';

import { userConstants, feedConstants } from '../constants';
import { history } from '../helpers';
import { userService, feedService } from '../services';
import { toast } from 'react-toastify';

//const limit = 20;

function* registerUser(action) {
    try {
        const user = yield call(userService.register, action.payload);
        toast.success('Registration Successful', { position: toast.POSITION.TOP_RIGHT })
        yield put({ type: "REGISTER_SUCCESS", payload: user.data.user });
        history.push('/login');

    } catch (e) {
        console.log(e.response);
        let errorMap = e.response.data.errors;
        let errorKeys = Object.keys(errorMap);
        let message = errorKeys.map((errorName, index) => {
            return `${errorName} ${errorMap[errorName]}${
                index === errorKeys.length - 2 ? ", " : ""
                }`;
        });
        toast.error({ message }, { position: toast.POSITION.TOP_RIGHT })
        yield put({ type: "REGISTER_FAILURE", payload: e.response.data.errors });
    }
}

function* registerFlow() {
    yield takeLatest("REGISTER_REQUEST", registerUser);
}

function* loginUser(action) {
    try {
        const user = yield call(userService.login, action.payload);
        yield put({ type: userConstants.LOGIN_SUCCESS, payload: user.data.user })
        localStorage.setItem('user', JSON.stringify(user.data.user));

        history.push('/')
    } catch (e) {
        console.log(e.response);
        let errorMap = e.response.data.errors;
        let errorKeys = Object.keys(errorMap);
        let message = errorKeys.map((errorName, index) => {
            return `${errorName} ${errorMap[errorName]}${
                index === errorKeys.length - 2 ? ", " : ""
                }`;
        });
        toast.error({ message }, { position: toast.POSITION.TOP_RIGHT })
        yield put({ type: userConstants.LOGIN_FAILURE, payload: e.response.data.errors });
    }
}

function* loginFlow() {
    yield takeLatest(userConstants.LOGIN_REQUEST, loginUser)
}

function* globalFeeds(action) {

    try {
        const globalFeeds = yield call(feedService.globalFeeds, action.payload);
        yield put({ type: feedConstants.GLOBAL_FEEDS_SUCCESS, payload: globalFeeds.data });

    } catch (e) {
        console.log(e.response);
        yield put({ type: feedConstants.GLOBAL_FEEDS_FAILURE, payload: e.response.data.errors });
    }
}

function* fetchGlobalFeeds() {
    yield takeLatest(feedConstants.GLOBAL_FEEDS_REQUEST, globalFeeds)
}

function* userFeeds(action) {

    try {
        const globalFeeds = yield call(feedService.userFeeds, action.payload);
        yield put({ type: feedConstants.USER_FEEDS_SUCCESS, payload: globalFeeds.data });

    } catch (e) {
        console.log(e.response);
        yield put({ type: feedConstants.USER_FEEDS_FAILURE, payload: e.response.data.errors });
    }
}

function* fetchUserFeeds() {
    yield takeLatest(feedConstants.USER_FEEDS_REQUEST, userFeeds)
}

function* singleFeed(action) {

    try {
        const singleFeed = yield call(feedService.singleFeed, action.payload);
        yield put({ type: feedConstants.SINGLE_FEED_SUCCESS, payload: singleFeed.data });
        yield put({ type: userConstants.FETCH_PROFILE_REQUEST, payload: singleFeed.data.article.author.username })


    } catch (e) {
        console.log(e);
        yield put({ type: feedConstants.SINGLE_FEED_FAILURE, payload: e.response.data });
    }
}

function* fetchSingleFeed() {
    yield takeLatest(feedConstants.SINGLE_FEED_REQUEST, singleFeed)
}


function* tags() {
    try {
        const tags = yield call(feedService.tags);
        yield put({ type: feedConstants.TAGS_SUCCESS, payload: tags.data.tags });

    } catch (e) {
        console.log(e.response);
        yield put({ type: feedConstants.TAGS_FAILURE, payload: e.response.data.errors });
    }
}


function* fetchTags() {
    yield takeLatest(feedConstants.TAGS_REQUEST, tags)
}

function* createArticle(action) {
    try {
        const articles = yield call(feedService.createArticle, action.payload);
        toast.success('Article Published', { position: toast.POSITION.TOP_RIGHT })
        yield put({ type: "CREATE_ARTICLE_SUCCESS", payload: articles.data.article });
        history.push(`/article/${articles.data.article.slug}`);

    } catch (e) {
        console.log(e.response);
        toast.error('Some error occured, Please try again', { position: toast.POSITION.TOP_RIGHT })
        yield put({ type: "CREATE_ARTICLE_FAILURE", payload: e.response.data.errors });
    }
}

function* createArticleFlow() {
    yield takeLatest(feedConstants.CREATE_ARTICLE_REQUEST, createArticle);
}

function* deleteArticle(action) {
    try {
        const articles = yield call(feedService.deleteArticle, action.payload);
        toast.success('Article Deleted', { position: toast.POSITION.TOP_RIGHT })
        yield put({ type: feedConstants.DELETE_ARTICLE_SUCCESS, payload: articles.data.article });
        history.push('/');

    } catch (e) {
        console.log(e.response);
        toast.error('Some error occured, Please try again', { position: toast.POSITION.TOP_RIGHT })
        yield put({ type: feedConstants.DELETE_ARTICLE_FAILURE, payload: e.response.data });
    }
}

function* deleteArticleFlow() {
    yield takeLatest(feedConstants.DELETE_ARTICLE_REQUEST, deleteArticle);
}

function* comments(action) {
    try {
        const comments = yield call(feedService.comments, action.payload);
        yield put({ type: feedConstants.FETCH_COMMENTS_SUCCESS, payload: comments.data.comments });

    } catch (e) {
        console.log(e.response);
        yield put({ type: feedConstants.FETCH_COMMENTS_FAILURE, payload: e.response.data });
    }
}


function* fetchComments() {
    yield takeLatest(feedConstants.FETCH_COMMENTS_REQUEST, comments)
}

function* postComment(action) {

    try {
        const response = yield call(feedService.postComment, action.payload);
        toast.success('Comment Posted', { position: toast.POSITION.TOP_RIGHT })
        yield put({ type: feedConstants.POST_COMMENT_SUCCESS, payload: response.data.comment });
        //yield put({ type: feedConstants.FETCH_COMMENTS_SUCCESS, payload: response.data.comment });

    } catch (e) {
        console.log(e.response);
        toast.error('Some error occured, Please try again', { position: toast.POSITION.TOP_RIGHT })
        yield put({ type: feedConstants.POST_COMMENT_FAILURE, payload: e.response.data });
    }
}

function* postCommentFlow() {
    yield takeLatest(feedConstants.POST_COMMENT_REQUEST, postComment);
}

function* deleteComment(action) {

    try {
        yield call(feedService.deleteComment, action.payload);
        toast.success('Comment Deleted', { position: toast.POSITION.TOP_RIGHT })
        yield put({ type: feedConstants.DELETE_COMMENT_SUCCESS, payload: action.payload });

    } catch (e) {
        console.log(e.response);
        toast.error('Some error occured, Please try again', { position: toast.POSITION.TOP_RIGHT })
        yield put({ type: feedConstants.DELETE_COMMENT_FAILURE, payload: e.response });
    }
}

function* deleteCommentFlow() {
    yield takeLatest(feedConstants.DELETE_COMMENT_REQUEST, deleteComment);
}

function* fetchProfile(action) {

    try {
        const profile = yield call(userService.fetchProfile, action.payload);
        yield put({ type: userConstants.FETCH_PROFILE_SUCCESS, payload: profile.data });

    } catch (e) {
        console.log(e.response);
        yield put({ type: userConstants.FETCH_PROFILE_FAILURE, payload: e.response });
    }
}

function* fetchProfileFlow() {
    yield takeLatest(userConstants.FETCH_PROFILE_REQUEST, fetchProfile);
}

function* followUser(action) {

    try {
        const profile = yield call(userService.followUser, action.payload);
        yield put({ type: userConstants.FOLLOW_USER_SUCCESS, payload: profile.data });
        // yield put({ type: feedConstants.FETCH_PROFILE_REQUEST, payload: action.payload.username });

    } catch (e) {
        console.log(e.response);
        yield put({ type: userConstants.FOLLOW_USER_FAILURE, payload: e.response });
    }
}

function* followUserFlow() {
    yield takeLatest(userConstants.FOLLOW_USER_REQUEST, followUser);
}

function* markAsFavorite(action) {

    try {
        const favoriteArticle = yield call(feedService.markAsFavorite, action.payload);
        yield put({ type: feedConstants.MARK_FAVORITE_SUCCESS, payload: favoriteArticle.data.article });

    } catch (e) {
        console.log(e.response);
        yield put({ type: feedConstants.MARK_FAVORITE_FAILURE, payload: e.response });
    }
}

function* markAsFavouriteFlow() {
    yield takeLatest(feedConstants.MARK_FAVORITE_REQUEST, markAsFavorite);
}

export default function* rootSaga() {
    yield all([
        registerFlow(),
        loginFlow(),
        fetchGlobalFeeds(),
        fetchTags(),
        fetchUserFeeds(),
        fetchSingleFeed(),
        createArticleFlow(),
        deleteArticleFlow(),
        fetchComments(),
        postCommentFlow(),
        deleteCommentFlow(),
        fetchProfileFlow(),
        followUserFlow(),
        markAsFavouriteFlow()
    ]);
}