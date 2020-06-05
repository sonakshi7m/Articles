import { feedConstants } from '../constants';

export const feedActions = {
    fetchGlobalFeeds,
    fetchTags,
    fetchSingleFeed,
    createArticle,
    deleteArticle,
    fetchComments,
    postComment,
    deleteComment
};

export function fetchGlobalFeeds(params) {
    return { type: feedConstants.GLOBAL_FEEDS_REQUEST, payload: params }
}

function fetchTags() {
    return { type: feedConstants.TAGS_REQUEST }
}

function createArticle(payload) {
    return { type: feedConstants.CREATE_ARTICLE_REQUEST, payload }
}

function fetchSingleFeed(payload) {
    return { type: feedConstants.SINGLE_FEED_REQUEST, payload }
}

function deleteArticle(payload) {
    return { type: feedConstants.DELETE_ARTICLE_REQUEST, payload }
}

function fetchComments(payload) {
    return { type: feedConstants.FETCH_COMMENTS_REQUEST, payload }

}
function postComment(payload) {
    return { type: feedConstants.POST_COMMENT_REQUEST, payload }
}

function deleteComment(payload) {
    return { type: feedConstants.DELETE_COMMENT_REQUEST, payload }
}

