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
        }

        this.username = this.props.match && this.props.match.params.username;

        this.handlePageChange = this.handlePageChange.bind(this);
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

    handlePageChange(pageNo, currentPage, totalPages) {
        if (pageNo === 'next') {
            if (currentPage < totalPages) {
                //this.props.updateFeedsPagination("pageChange", currentPage + 1);
                this.setState({
                    currentPage: currentPage + 1,
                    offset: this.state.offset + this.state.limit,
                }, () => {
                    let params = {
                        limit: this.state.limit,
                        offset: this.state.offset
                    }
                    //this.props.updateEmployeesParams("pageChange", currentPage + 1);
                    this.props.fetchGlobalFeeds(params);
                });

            }
        } else if (pageNo === 'previous') {
            if (currentPage !== 1) {
                this.setState({ currentPage: currentPage - 1 });
                //this.props.updateEmployeesParams("pageChange", currentPage - 1);
                this.setState({
                    currentPage: currentPage - 1,
                    offset: this.state.offset - this.state.limit
                }, () => {
                    let params = {
                        limit: this.state.limit,
                        offset: this.state.offset
                    }
                    //this.props.updateEmployeesParams("pageChange", currentPage + 1);
                    this.props.fetchGlobalFeeds(params);
                });
            }
        }
    }



    render() {
        const { articles, totalPages, totalCount, loading, profile, loggedinUser } = this.props;
        const { limit, offset, currentPage } = this.state;
        var startIndex = offset + 1;

        var lastIndex = totalCount < limit ? totalCount : offset + limit;

        return (

            <div className="container profile-page">
                {profile && <div className="user-info">
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
                            <Pagination startIndex={startIndex} lastIndex={lastIndex} totalCount={totalCount}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange} totalPages={totalPages} />

                        </div>

                        <div label="Favorite Articles">
                            {articles.length === 0 &&
                                <div>No feeds available yet</div>
                            }
                            {articles.length &&
                                <>
                                    <GlobalFeeds articles={articles} />
                                    <Pagination startIndex={startIndex} lastIndex={lastIndex} totalCount={totalCount}
                                        currentPage={currentPage}
                                        onPageChange={this.handlePageChange} totalPages={totalPages} />
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