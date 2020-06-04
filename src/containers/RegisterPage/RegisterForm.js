import React from 'react';
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from 'yup';
import './RegisterForm.css';

class RegisterForm extends React.Component {

    // validationSchema = Yup.object().shape({
    //     username: Yup.string().required("Name is required"),
    //     email: Yup.string()
    //         .email("Please enter valid email")
    //         .required("Email is required")
    // });



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
                        .min(6, 'Password must be at least 6 characters')
                        //.matches(/[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/i, 'invalid Password')
                        .required('Password is required'),
                    username: Yup.string()
                        .required('Username is required')
                })}
                onSubmit={onSubmit}
                render={({ errors, status, touched }) => (
                    <Form className="registerform">

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Register</button>

                        </div>
                    </Form>
                )}
            />
        )
    }

}

export default RegisterForm;