import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../helpers';

import './GlobalFeeds.css'

export const GlobalFeeds = ({ articles, totalPages, loading }) => {

    // if (!articles.length) {
    //     return <div>Loading...</div>
    // }

    // if(!articles.length && )

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
                            <Link to={`/article/${article.slug}`} className="author" href="">{article.author.username} </Link>
                            <span className="date" >{article.createdAt}</span>
                        </div>
                    </div>
                    <h3 onClick={() => { history.push(`/article/${article.slug}`) }}>{article.title}</h3>
                    <p>{article.description}</p>
                    <span onClick={() => { history.push(`/article/${article.slug}`) }}>Read more...</span>
                </div>
            })



        )
    }

}