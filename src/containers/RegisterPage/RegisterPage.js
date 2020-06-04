import React from 'react';
import RegisterForm from './RegisterForm'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../../actions';

import "react-toastify/dist/ReactToastify.min.css";

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(fields, cb) {
        cb.resetForm(this.state)

        this.props.register(fields)
    }

    render() {
        //     const { user, error } = this.props;
        // if (user !== '') toast.success('Registration Successful', {
        //     position: toast.POSITION.TOP_RIGHT
        // });

        // if (error !== '') toast.error('Registration Failed', {
        //     position: toast.POSITION.TOP_RIGHT
        // });



        return (
            < RegisterForm
                data={this.state}
                onSubmit={this.handleSubmit}
            />
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.registration.user,
        error: state.registration.error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);