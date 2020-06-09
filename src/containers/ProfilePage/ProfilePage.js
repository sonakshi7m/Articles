import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Tabs } from '../../components/Tabs';

import { GlobalFeeds } from '../../components/GlobalFeeds';
import { Pagination } from '../../components/Pagination';
import { fetchProfile, followUser } from '../../actions/userActions';
import { fetchGlobalFeeds, markAsFavorite } from '../../actions/feedActions';
import { history } from '../../helpers';

import './ProfilePage.css';


class ProfilePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            limit: 10,
            offset: 0,
            currentPage: 1,
            isSameUser: false
        }

        this.username = this.props.match && this.props.match.params.username;

        this.handleLoadList = this.handleLoadList.bind(this);
        this.handleFollowClick = this.handleFollowClick.bind(this);

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

        //if (this.props.loggedinUser.username !== this.username) {
        this.props.fetchProfile(this.username)
        //}
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.setState({ isSameUser: true })
        }

    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.singleFeed !== prevProps.singleFeed) {
            let params = {
                author: this.username,
                limit: this.state.limit,
                offset: this.state.offset,
            }
            this.props.fetchGlobalFeeds(params);
        }
    }

    handleFollowClick(type) {
        const { followUser } = this.props;

        followUser({ type, username: this.username });
    }

    onMarkAsFavClick = (type, slug, favorited) => {
        const {
            loggedinUser,
            markAsFavorite,
        } = this.props;

        if (!loggedinUser) {
            history.push(`/login`);
            return;
        }

        markAsFavorite({ type, slug, favorited });
    };

    handleLoadList(articleOffset) {
        this.props.fetchGlobalFeeds({ limit: this.state.limit, offset: articleOffset });
    }



    render() {
        const { articles, totalCount, loading, profile, loggedinUser } = this.props;
        const { isSameUser } = this.state;

        return (

            <div className="container profile-page">
                {profile && !isSameUser && < div className="user-info">
                    <img className="user-img" alt="" src={profile && profile.image} />
                    <h4 className="author">{profile && profile.username}</h4>
                    <p className="bio">{profile && profile.bio}</p>
                    {!profile.following &&
                        <Button onClick={() => this.handleFollowClick('post')}>Follow {profile.username}</Button>}
                    {profile.following &&
                        <Button onClick={() => { this.handleFollowClick('delete') }}>Unfollow {profile.username}</Button>
                    }
                </div>
                }


                <div className="user-articles">
                    <Tabs>
                        <div label="My Articles">
                            <GlobalFeeds articles={articles} loading={loading} showFavorites={true}
                                handleMarkAsFavClick={this.onMarkAsFavClick} loggedinUser={loggedinUser} />
                            {totalCount > 10 && <Pagination
                                totalNumberOfItem={totalCount}
                                dataLimit={this.state.limit}
                                loadList={this.handleLoadList}
                            />}

                        </div>

                        <div label="Favorite Articles">
                            {articles.length === 0 &&
                                <div>No feeds available yet</div>
                            }
                            {articles.length &&
                                <>
                                    <GlobalFeeds articles={articles} />
                                    {totalCount > 10 && <Pagination
                                        totalNumberOfItem={totalCount}
                                        dataLimit={this.state.limit}
                                        loadList={this.handleLoadList}
                                    />}
                                </>
                            }

                        </div>


                    </Tabs>
                </div>

            </div >
        );


    }
}


function mapStateToProps(state) {
    return {
        articles: state.globalFeeds.globalFeeds,
        totalPages: state.globalFeeds.totalPages,
        totalCount: state.globalFeeds.totalCount,
        loggedinUser: state.login.user,
        loading: state.globalFeeds.loading,
        profile: state.profile.profile,
        requesting: state.singleFeed.requesting,
        singleFeed: state.singleFeed.singleFeed
    }
}

export default connect(mapStateToProps, { fetchProfile, fetchGlobalFeeds, followUser, markAsFavorite })(ProfilePage);