

import React, { Component } from 'react';
import moment from 'moment';

import './Comments.css';

class Comments extends Component {

    render() {

        const { comments, handleDeleteComment } = this.props;

        return (
            <div>
                {comments
                    ? comments.map((comment, index) => {
                        return < div className="card" key={index} >
                            <div className="card-block">
                                <p className="card-text">{comment.body}</p>
                            </div>
                            <div className="card-footer">
                                <a className="comment-author" href="">
                                    <img src={comment.author.image} alt="author" className="comment-author-img" />
                                </a>

                                <a className="comment-author" href="">{comment.author.usernam}</a>
                                <span className="date-posted"> {moment(comment.updatedAt).format('MMMM, Do YYYY, hh:mm a')}</span>
                                <span className="mod-options" onClick={() => handleDeleteComment(comment.id)}>
                                    <svg
                                        className="bi bi-trash-fill"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div >;
                    })
                    : "Loading..."}

            </div>

        );

    }
}

export default Comments;