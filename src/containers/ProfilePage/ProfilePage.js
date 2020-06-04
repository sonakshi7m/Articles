import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs } from '../../components/Tabs';
import moment from 'moment';

import { history } from '../../helpers';
import { feedActions } from '../../actions';
import { Comments } from '../Comments';

import './ProfilePage.css';


class ProfilePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            limit: 5,
            offset: 0
        }

        this.username = this.props.match && this.props.match.params.username;

    }


    componentDidMount() {
        // const { slug } = this.props.match && this.props.match.params;

        if (this.username) {
            // this.props.fetchProfile(this.username);
            let params = {
                author: this.username,
                limit: this.state.limit,
                offset: this.state.offset,
            }
            this.props.fetchGlobalFeeds(params);
        }

    }

    render() {
        const { articles, loggedinUser } = this.props;
        console.log(articles, loggedinUser)

        return (

            <div className="container profile-page">
                <div className="user-info">
                    <img className="user-img" src="" />
                    <h4 className="author">nipun22m</h4>
                    <p className="bio"></p>
                    <Button >Follow user</Button>
                    <Button >Edit Profile Settings</Button>
                </div>

            </div >
        );


    }
}


function mapStateToProps(state) {
    return {
        articles: state.globalFeeds.globalFeeds,
        loggedinUser: state.login.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(feedActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);