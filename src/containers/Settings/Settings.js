import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../../actions';
import SettingsForm from './SettingsForm'

import "react-toastify/dist/ReactToastify.min.css";

import './Settings.css';

class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            image: '',
            username: '',
            bio: '',
            email: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(fields, cb) {
        cb.resetForm(this.state)

        // this.props.updateUser(fields)
    }

    componentDidMount() {
        const { user } = this.props;

        if (user) {
            this.setState({
                image: user.image,
                username: user.username,
                bio: user.bio,
                email: user.email,
            })
        }
    }

    render() {
        const { user } = this.props;
        if (user) {
            return (
                <div className="settings">
                    <h3>Your Settings</h3>
                    < SettingsForm
                        user={this.props.user}
                        data={this.state}
                        onSubmit={this.handleSubmit}
                    />

                </div>
            )
        } else {
            return <div>Loading...</div>
        }

    }

}

function mapStateToProps(state) {
    return {
        user: state.login.user,
        error: state.login.error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);