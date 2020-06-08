import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import moment from 'moment';

import { history } from '../../helpers';
import { fetchSingleFeed, fetchComments, deleteComment, deleteArticle, postComment, markAsFavorite } from '../../actions/feedActions';
import { fetchProfile, followUser } from '../../actions/userActions';
import { Comments } from '../Comments';

import './ArticlePage.css';


class ArticlePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            comment: ''
        }

        this.slug = this.props.match && this.props.match.params.slug;

        this.editArticle = this.editArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePostComment = this.handlePostComment.bind(this);
        this.onDeleteComment = this.onDeleteComment.bind(this);
        this.handleMarkAsFavorite = this.handleMarkAsFavorite.bind(this);
    }


    componentDidMount() {
        // const { slug } = this.props.match && this.props.match.params;

        if (this.slug) {
            this.props.fetchSingleFeed(this.slug)
            this.props.fetchComments(this.slug);
        }

        this.handleFollowClick = this.handleFollowClick.bind(this);

    }

    onDeleteComment(commentId) {

        this.props.deleteComment({ commentId, slug: this.slug });
    };

    editArticle() {
        const { slug } = this.props.match && this.props.match.params;
        history.push(`/edit/article/${slug}`)
    }

    deleteArticle() {
        this.setState({ isOpen: true })
    }

    onDismiss() {
        this.setState({ isOpen: false })
    }

    handleDelete() {
        const { slug } = this.props.match && this.props.match.params;
        this.props.deleteArticle(slug)
    }

    handleChange(e) {
        this.setState({ comment: e.target.value })
    }

    handlePostComment() {
        const { slug } = this.props.match && this.props.match.params;
        const comment = {
            body: this.state.comment
        }
        const payload = {
            slug,
            comment
        }
        this.props.postComment(payload);
        this.setState({ comment: '' })
    }

    handleFollowClick(type, slug) {
        const { followUser, profile, loggedinUser } = this.props;

        loggedinUser ? followUser({ type, username: profile.username, slug }) : history.push('/login');
    }

    handleMarkAsFavorite(type) {
        const { markAsFavorite, loggedinUser } = this.props;

        loggedinUser ? markAsFavorite({ type, slug: this.slug }) : history.push('/login');
    }

    render() {
        const { singleFeed, isSameUser, comments, profile } = this.props;
        const { isOpen } = this.state;

        if (singleFeed) {
            return (

                <div className="container article-page">
                    <div className="banner">
                        <h1>{singleFeed.title}</h1>
                        <div className="article-meta">
                            <span><img src={singleFeed.author && singleFeed.author.image} alt="IMG" /></span>
                            <div className="info">
                                <Link to={`/profile/${singleFeed.author && singleFeed.author.username}`} className="author" href="">{singleFeed.author && singleFeed.author.username}</Link>
                                <span className="date" >{moment(singleFeed.createdAt).format('MMMM, Do YYYY, hh:mm a')}</span>
                            </div>
                        </div>
                    </div>
                    <Alert style={{ position: "relative", width: "400px", "z- index": 9999, left: "400px" }} color="info" isOpen={isOpen} toggle={this.onDismiss}>
                        Are you sure you want to delete?
                        <br />
                        <Button onClick={this.handleDelete} className="deletebtn">Yes</Button>
                        <Button onClick={this.onDismiss}>No</Button>
                    </Alert>
                    {
                        isSameUser &&
                        <div className="article-meta">
                            <Button onClick={this.editArticle}>Edit Article</Button>
                            <Button onClick={this.deleteArticle}>Delete Article</Button>

                        </div>
                    }
                    {
                        !isSameUser &&

                        <div className="article-meta">
                            {profile && !profile.following && <Button onClick={() => this.handleFollowClick('post', singleFeed.slug)}>Follow {profile && profile.username} </Button>}
                            {profile && profile.following && <Button onClick={() => this.handleFollowClick('delete', singleFeed.slug)}>Unfollow {profile && profile.username} </Button>}
                            {singleFeed && !singleFeed.favorited && <Button onClick={() => this.handleMarkAsFavorite('post')}>Favorite Article </Button>}
                            {singleFeed && singleFeed.favorited && <Button onClick={() => this.handleMarkAsFavorite('delete')}>Unfavorite Article </Button>}
                        </div>
                    }



                    <div className="comment">
                        <Form>
                            <FormGroup>
                                <Input type="textarea" name="comment" value={this.state.comment} onChange={this.handleChange} id="comment" placeholder="Write a comment..." />
                            </FormGroup>
                            <Button disabled={this.state.comment === ''} onClick={this.handlePostComment}>Post Comment</Button>
                        </Form>

                        {comments.length > 0 && <Comments slug={this.slug} comments={comments} handleDeleteComment={this.onDeleteComment} />}


                    </div>
                </div >
            );
        }


    }
}


function mapStateToProps(state) {
    return {
        loggedinUser: state.login.user,
        singleFeed: state.singleFeed.singleFeed,
        isSameUser: state.singleFeed.isSameUser,
        comments: state.comments.comments,
        profile: state.profile.profile,
        //commentPosted: state.postComment.posted
    }
}

export default connect(mapStateToProps, { fetchSingleFeed, fetchComments, deleteComment, deleteArticle, postComment, fetchProfile, followUser, markAsFavorite })(ArticlePage);