import React from 'react';
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from 'yup';
import './Settings.css';

class SettingForm extends React.Component {

    render() {
        console.log(this.props.user)
        let {
            onSubmit,
            data,
            user
        } = this.props;

        data = { ...user }
        console.log(data)
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
            >
                {({ errors, status, touched }) => (
                    <Form className="settingsform">
                        <div className="form-group">
                            <Field name="image" type="text" value={data.image} placeholder="URL of profile picture" className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} />
                            <ErrorMessage name="image" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <Field name="username" type="text" value={data.username} placeholder="Username" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <Field as="textarea" name="bio" type="text" value={data.bio} placeholder="Short bio about you" className={'form-control' + (errors.bio && touched.bio ? ' is-invalid' : '')} />
                            <ErrorMessage name="bio" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <Field name="email" type="text" value={data.email} placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="password" type="password" placeholder="Password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Update Settings</button>

                        </div>
                    </Form>
                )}
            </Formik>
        )
    }

}

export default SettingForm;