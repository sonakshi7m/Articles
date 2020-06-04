import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';

import { history } from '../../helpers';
import { feedActions } from '../../actions';
import { Comments } from '../Comments';

import './ArticlePage.css';

//import { userActions } from '../_actions';

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
    }


    componentDidMount() {
        // const { slug } = this.props.match && this.props.match.params;

        if (this.slug) {
            this.props.fetchSingleFeed(this.slug);
            this.props.fetchComments(this.slug);
        }

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

    render() {
        const { singleFeed, isSameUser, comments } = this.props;
        const { isOpen } = this.state;

        if (singleFeed) {
            return (

                <div className="container article-page">
                    <div className="banner">
                        <h1>{singleFeed.title}</h1>
                        <div className="article-meta">
                            <a href="#"><img src={singleFeed.author && singleFeed.author.image} alt="IMG" /></a>
                            <div className="info">
                                <Link to="/article/:slug" className="author" href="">{singleFeed.author && singleFeed.author.username}</Link>
                                <span className="date" >{singleFeed.createdAt}</span>
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
                            <Button>Follow {singleFeed.author && singleFeed.author.username} </Button>
                            <Button>Favorite Article</Button>
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
        //commentPosted: state.postComment.posted
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(feedActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);