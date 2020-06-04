import React from 'react';
import CreateArticleForm from './CreateArticleForm';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { feedActions } from '../../actions';

class CreateArticle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            body: '',
            tagList: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { slug } = this.props.match && this.props.match.params;

        if (slug) {
            const { singleFeed } = this.props;
            this.setState({
                title: singleFeed.title,
                description: singleFeed.description,
                body: singleFeed.body,
                tagList: singleFeed.tagList
            })

        }

    }

    handleSubmit(fields, cb) {
        cb.resetForm(this.state)
        const tagList = fields.tagList.replace(/\s/g, "").split(',');
        fields = { ...fields, tagList: tagList };
        this.props.createArticle(fields)
    }

    render() {
        return (
            <CreateArticleForm
                data={this.state}
                onSubmit={this.handleSubmit}
            />
        )
    }

}

function mapStateToProps(state) {
    return {
        article: state.createArticle.article,
        singleFeed: state.singleFeed.singleFeed
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(feedActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);