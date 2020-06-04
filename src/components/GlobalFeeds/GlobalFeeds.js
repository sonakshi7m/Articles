import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../helpers';

import './GlobalFeeds.css'

export const GlobalFeeds = ({ articles, totalPages }) => {

    // if (!articles.length) {
    //     return <div>Loading...</div>
    // }

    // if(!articles.length && )

    return (



        articles.map((article, index) => {
            return <div className="container-article" key={index}>
                <div className="article-meta" key={index}>
                    <a href="#"><img src={article.author.image} /></a>
                    <div className="info">
                        <Link to="/article/:slug" className="author" href="">{article.author.username} </Link>
                        <span className="date" >{article.createdAt}</span>
                    </div>
                </div>
                <h3 onClick={() => { history.push(`/article/${article.slug}`) }}>{article.title}</h3>
                <p>{article.description}</p>
                <span>Read more...</span>
            </div>
        })



    )
}