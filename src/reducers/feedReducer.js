import { feedConstants } from '../constants';

let tagsInitialState = {
    tags: [],
    loading: false,
    error: null
}

let globalFeedsInitialState = {
    globalFeeds: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalCount: 0,
    totalPages: 0
}

let userFeedsInitialState = {
    userFeeds: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalCount: 0,
    totalPages: 0
}

let createArticleInitialState = {
    article: [],
    loading: false,
    error: null
}

let singleFeedInitialState = {
    singleFeed: [],
    loading: false,
    error: null,
    isSameUser: false
}

let deleteArticleInitialState = {
    deleted: true,
    deleting: false,
    error: null
}

let commentsInitialState = {
    comments: [],
    loading: false,
    posting: false,
    error: null
}

function checkIfUserIsSame(article) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.username === article.author.username) {
        return true;
    }
    return false;
}


export function tag(state = tagsInitialState, action) {
    switch (action.type) {
        case feedConstants.TAGS_REQUEST:
            return { ...state, loading: true };
        case feedConstants.TAGS_SUCCESS:
            return { ...state, tags: action.payload, error: null, loading: false };
        case feedConstants.TAGS_FAILURE:
            return { ...state, tags: [], error: action.payload, loading: false };
        default:
            return state
    }
}

export function globalFeeds(state = globalFeedsInitialState, action) {
    switch (action.type) {
        case feedConstants.GLOBAL_FEEDS_REQUEST:
            return { ...state, loading: true };
        case feedConstants.GLOBAL_FEEDS_SUCCESS:
            return {
                ...state, globalFeeds: action.payload.articles, error: null, loading: false,
                totalPages: Math.ceil(action.payload.articlesCount / 20),
                totalCount: action.payload.articlesCount

            };
        case feedConstants.GLOBAL_FEEDS_FAILURE:
            return { ...state, globalFeeds: [], error: action.payload, loading: false };
        default:
            return state
    }
}

export function userFeeds(state = userFeedsInitialState, action) {
    switch (action.type) {
        case feedConstants.USER_FEEDS_REQUEST:
            return { ...state, loading: true };
        case feedConstants.USER_FEEDS_SUCCESS:
            return {
                ...state, userFeeds: action.payload.articles, error: null, loading: false,
                totalPages: Math.ceil(action.payload.articlesCount / 20),
                totalCount: action.payload.articlesCount

            };
        case feedConstants.USER_FEEDS_FAILURE:
            return { ...state, userFeeds: [], error: action.payload, loading: false };
        default:
            return state
    }
}

export function singleFeed(state = singleFeedInitialState, action) {
    switch (action.type) {
        case feedConstants.SINGLE_FEED_REQUEST:
            return { ...state, loading: true };
        case feedConstants.SINGLE_FEED_SUCCESS:
            return { ...state, singleFeed: action.payload.article, error: null, loading: false, isSameUser: checkIfUserIsSame(action.payload.article) };
        case feedConstants.SINGLE_FEED_FAILURE:
            return { ...state, singleFeed: [], error: action.payload, loading: false };
        default:
            return state
    }
}

export function createArticle(state = createArticleInitialState, action) {
    switch (action.type) {
        case feedConstants.CREATE_ARTICLE_REQUEST:
            return { ...state, loading: true };
        case feedConstants.CREATE_ARTICLE_SUCCESS:
            return {
                ...state, article: action.payload.article, error: null, loading: false
            };
        case feedConstants.CREATE_ARTICLE_FAILURE:
            return { ...state, article: [], error: action.payload, loading: false };
        default:
            return state
    }
}

export function deleteArticle(state = deleteArticleInitialState, action) {
    switch (action.type) {
        case feedConstants.DELETE_ARTICLE_REQUEST:
            return { ...state, deleting: true };
        case feedConstants.DELETE_ARTICLE_SUCCESS:
            return {
                ...state, deleted: true, error: null, deleting: false
            };
        case feedConstants.DELETE_ARTICLE_FAILURE:
            return { ...state, deleted: false, error: action.payload, deleting: false };
        default:
            return state
    }
}

export function comments(state = commentsInitialState, action) {
    switch (action.type) {
        case feedConstants.FETCH_COMMENTS_REQUEST:
            return { ...state, loading: true };
        case feedConstants.FETCH_COMMENTS_SUCCESS:

            return {
                ...state,
                error: null, loading: false,
                comments: [...action.payload],
            };
        case feedConstants.FETCH_COMMENTS_FAILURE:
            return { ...state, comments: [], error: action.payload, loading: false };
        case feedConstants.POST_COMMENT_REQUEST:
            return { ...state, posting: true };
        case feedConstants.POST_COMMENT_SUCCESS:
            let { comments } = state;

            return {
                ...state,
                requesting: false,
                comments: [action.payload, ...comments],
            };
        case feedConstants.DELETE_COMMENT_REQUEST:
            return { ...state, posting: true };

        case feedConstants.DELETE_COMMENT_SUCCESS:

            return {
                ...state,
                requesting: false,
                comments: state.comments.filter((comment) => {
                    return comment.id !== action.payload.commentId;
                }),
            }
        default:
            return state
    }
}
// export function postComment(state = commentsInitialState, action) {
//     switch (action.type) {
//         case feedConstants.POST_COMMENT_REQUEST:
//             return { ...state, posting: true };
//         case feedConstants.POST_COMMENT_SUCCESS:
//             const { comments } = state;

//             return {
//                 ...state,
//                 requesting: false,
//                 comments: [action.payload, ...comments],
//             };
//         case feedConstants.POST_COMMENT_FAILURE:
//             return { ...state, error: action.payload, posting: false };
//         default:
//             return state
//     }
// }