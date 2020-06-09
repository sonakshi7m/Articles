import { feedConstants } from '../constants';

export const feedActions = {
    fetchGlobalFeeds,
    fetchTags,
    fetchSingleFeed,
    createArticle,
    deleteArticle,
    fetchComments,
    postComment,
    deleteComment,
    markAsFavorite,
    markArticleAsFavorite
};

export function fetchGlobalFeeds(params) {
    return { type: feedConstants.GLOBAL_FEEDS_REQUEST, payload: params }
}

export function fetchTags() {
    return { type: feedConstants.TAGS_REQUEST }
}

export function createArticle(payload) {
    return { type: feedConstants.CREATE_ARTICLE_REQUEST, payload }
}

export function fetchSingleFeed(payload) {
    return { type: feedConstants.SINGLE_FEED_REQUEST, payload }
}

export function deleteArticle(payload) {
    return { type: feedConstants.DELETE_ARTICLE_REQUEST, payload }
}

export function fetchComments(payload) {
    return { type: feedConstants.FETCH_COMMENTS_REQUEST, payload }

}
export function postComment(payload) {
    return { type: feedConstants.POST_COMMENT_REQUEST, payload }
}

export function deleteComment(payload) {
    return { type: feedConstants.DELETE_COMMENT_REQUEST, payload }

}
export function markAsFavorite(payload) {
    return { type: feedConstants.MARK_FAVORITE_REQUEST, payload }
}
export function markArticleAsFavorite(payload) {
    return { type: feedConstants.MARK_ARTICLE_FAVORITE_REQUEST, payload }
}


