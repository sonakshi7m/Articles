import React from 'react';
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from 'yup';
import './CreateArticle.css';

class CreateArticleForm extends React.Component {

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
                initialValues={{ ...data, tagList: data.tagList.join(',') }
                }
                enableReinitialize={true}
                validationSchema={
                    Yup.object().shape({
                        title: Yup.string()
                            .required('Title is required'),
                        description: Yup.string()
                            .required('Description is required'),
                        body: Yup.string()
                            .required('Body is required')
                    })
                }
                onSubmit={onSubmit}
            >
                {({ errors, status, touched }) => (
                    <Form className="createArticleForm">

                        <div className="form-group">
                            <Field name="title" type="text" placeholder="Article Title" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <Field name="description" type="text" placeholder="What's this article about?" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                            <ErrorMessage name="description" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <Field as="textarea" name="body" type="text" placeholder="Write your article" className={'form-control' + (errors.body && touched.body ? ' is-invalid' : '')} />
                            <ErrorMessage name="body" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <Field name="tagList" type="text" placeholder="Enter tags (Comma separated)" className={'form-control' + (errors.tagList && touched.tagList ? ' is-invalid' : '')} />
                            <ErrorMessage name="tagList" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Publish Article</button>

                        </div>
                    </Form>
                )}

            </Formik>

        )
    }

}

export default CreateArticleForm;