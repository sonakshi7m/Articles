import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../helpers';
import cx from 'classnames';
import moment from 'moment';

import './GlobalFeeds.css'

const getFavIcon = (favorited, count, slug, handleClick) => {
    const classes = cx('btn rounded-pill mr-1 info-action', {
        'badge-info': favorited,
        '': !favorited,
    });

    if (!favorited) {
        return (
            <div className={classes} onClick={() => handleClick('post', slug, favorited)}>
                <svg
                    className="bi bi-heart"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    />
                </svg>
                {count}
            </div>

        );
    }

    return (
        <div className="info-action" onClick={() => handleClick('delete', slug, favorited)}>
            <svg
                className="bi bi-heart-fill"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
            </svg>
            {count}
        </div>
    );
}

export const GlobalFeeds = ({ articles, totalPages, loading, handleMarkAsFavClick, requesting, loggedinUser }) => {
    if (loading) {
        return <div>Loading...</div>
    }
    else {
        return (

            articles.map((article, index) => {
                return <div className="container-article" key={index}>
                    <div className="article-meta" key={index}>
                        <Link to={`/profile/${article.author.username}`}><img alt="" src={article.author.image} /></Link>
                        <div className="info">
                            <Link to={`/profile/${article.author.username}`} className="author" href="">{article.author.username} </Link>
                            <span className="date" >{moment(article.createdAt).format('MMMM, Do YYYY, hh:mm a')}</span>
                        </div>
                        {loggedinUser && getFavIcon(article.favorited, article.favoritesCount, article.slug, handleMarkAsFavClick, requesting)}

                    </div>
                    <h3 onClick={() => { history.push(`/article/${article.slug}`) }}>{article.title}</h3>
                    <p>{article.description}</p>
                    <span onClick={() => { history.push(`/article/${article.slug}`) }}>Read more...</span>
                </div>
            })



        )
    }

}