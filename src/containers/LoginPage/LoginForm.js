import React from 'react';
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from 'yup';
import './LoginForm.css';

class LoginForm extends React.Component {

    render() {
        let {
            onSubmit,
            data,
        } = this.props;
        return (
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                resetForm={data}
                initialValues={data}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .required('Password is required')
                })}
                onSubmit={onSubmit}
                render={({ errors, status, touched }) => (
                    <Form className="loginform">

                        <div className="form-group">
                            <Field name="email" type="text" placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <Field name="password" type="password" placeholder="Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Sign in</button>

                        </div>
                    </Form>
                )}
            />
        )
    }

}

export default LoginForm;