import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { feedActions } from '../../actions';
import { Tags } from '../../components/Tags';
import { Tabs } from '../../components/Tabs';
import { GlobalFeeds } from '../../components/GlobalFeeds';
import { Pagination } from '../../components/Pagination';

import './HomePage.css';

//import { userActions } from '../_actions';

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            limit: 10,
            currentPage: 1,
            offset: 0

        }

        this.handlePageChange = this.handlePageChange.bind(this);

    }

    componentDidMount() {
        this.props.fetchTags();
        let params = {
            limit: this.state.limit,
            offset: this.state.offset
        }
        this.props.fetchGlobalFeeds(params);
    }

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
        const { tags, loading, globalFeeds, totalPages, totalCount, loggedinUser, userFeeds, userFeedsLoading } = this.props;
        const { limit, offset, currentPage } = this.state;
        var startIndex = offset + 1;

        var lastIndex = offset + limit;

        if (loggedinUser) {
            return (
                <div className="container page row">

                    <div className="col-md-8 feeds">
                        <Tabs>
                            <div label="Global Feeds">
                                <GlobalFeeds articles={globalFeeds} />
                                <Pagination startIndex={startIndex} lastIndex={lastIndex} totalCount={totalCount}
                                    currentPage={currentPage}
                                    onPageChange={this.handlePageChange} totalPages={totalPages} />

                            </div>

                            <div label="My Feeds">
                                {!userFeeds.length && !userFeedsLoading &&
                                    <div>No feeds available yet</div>
                                }
                                {userFeeds.length && !userFeedsLoading &&
                                    <>
                                        <GlobalFeeds articles={userFeeds} feedsLoading={userFeedsLoading} />
                                        <Pagination startIndex={startIndex} lastIndex={lastIndex} totalCount={totalCount}
                                            currentPage={currentPage}
                                            onPageChange={this.handlePageChange} totalPages={totalPages} />
                                    </>
                                }

                            </div>


                        </Tabs>

                    </div>
                    <Tags tags={tags} loading={loading} />
                </div>
            )
        }
        else {
            return (
                <div className="container page row">

                    <div className="col-md-8 feeds">
                        <h6>Global Feeds</h6>

                        <div label="Global Feeds">
                            <GlobalFeeds articles={globalFeeds} />
                            <Pagination startIndex={startIndex} lastIndex={lastIndex} totalCount={totalCount}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange} totalPages={totalPages} />

                        </div>


                    </div>
                    <Tags tags={tags} loading={loading} />

                </div>
            );
        }


    }
}


function mapStateToProps(state) {
    return {
        tags: state.tag.tags,
        loading: state.tag.loading,
        globalFeeds: state.globalFeeds.globalFeeds,
        totalPages: state.globalFeeds.totalPages,
        currentPage: state.globalFeeds.currentPage,
        totalCount: state.globalFeeds.totalCount,
        loggedinUser: state.login.user,
        userFeeds: state.userFeeds.userFeeds,
        userFeedsLoading: state.userFeeds.userFeedsLoading
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(feedActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);