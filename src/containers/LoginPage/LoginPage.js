import React from 'react';
import LoginForm from './LoginForm'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../../actions';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(fields, cb) {
        cb.resetForm(this.state)

        this.props.login(fields)
    }

    render() {
        return (
            <LoginForm
                data={this.state}
                onSubmit={this.handleSubmit}
            />
        )
    }

}

function mapStateToProps(state) {
    return {
        loginUser: state.login
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);