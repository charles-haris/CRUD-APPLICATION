import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ApiService from '../services/api';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(id ? true : false);
    const [error, setError] = useState(null);
    const isEditMode = Boolean(id);

    useEffect(() => {
        const fetchStudent = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const response = await ApiService.getStudent(id);
                    setStudent(response.data);
                    setLoading(false);
                } catch (err) {
                    setError('Failed to fetch student details');
                    setLoading(false);
                    console.error('Error fetching student:', err);
                }
            }
        };

        fetchStudent();
    }, [id]);

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        address: '',
        gradeLevel: '',
        major: '',
        academicStatus: 'active',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phoneNumber: Yup.string(),
        gender: Yup.string(),
        address: Yup.string(),
        gradeLevel: Yup.string(),
        major: Yup.string(),
        academicStatus: Yup.string(),
    });

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            if (isEditMode) {
                await ApiService.updateStudent(id, values);
            } else {
                await ApiService.createStudent(values);
            }
            navigate('/');
        } catch (err) {
            console.error('Form submission error:', err);
            const responseErrors = err.response?.data?.errors;

            if (responseErrors) {
                const formattedErrors = {};
                for (const key in responseErrors) {
                    formattedErrors[key] = responseErrors[key][0];
                }
                setStatus({ errors: formattedErrors });
            } else {
                setStatus({
                    generalError: 'An error occurred while saving the student. Please try again.'
                });
            }
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="card">
            <div className="card-header">
                <h2>{isEditMode ? 'Edit Student' : 'Add New Student'}</h2>
            </div>
            <div className="card-body">
                <Formik
                    initialValues={student || initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, status }) => (
                        <Form>
                            {status && status.generalError && (
                                <div className="alert alert-danger">{status.generalError}</div>
                            )}

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="first_name" className="form-label">First Name *</label>
                                    <Field name="firstName" type="text" className="form-control" />
                                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="last_name" className="form-label">Last Name *</label>
                                    <Field name="lastName" type="text" className="form-control" />
                                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label">Email *</label>
                                    <Field name="email" type="email" className="form-control" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                                    <Field name="phoneNumber" type="text" className="form-control" />
                                    <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <Field name="address" type="text" className="form-control" />
                                    <ErrorMessage name="address" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="gender" className="form-label">Gender</label>
                                    <Field name="gender" as="select" className="form-control">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="text-danger" />
                                </div>
                            </div>

                            {/* <h4 className="mt-4">Address Information</h4>
                            <div className="row">
                                <div className="col-md-12 mb-3">

                                </div>
                            </div> */}


                            <h4 className="mt-4">Academic Information</h4>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="academic_status" className="form-label">Academic Status</label>
                                    <Field name="academicStatus" as="select" className="form-control">
                                        <option value="active">Active</option>
                                        <option value="graduated">Graduated</option>
                                        <option value="on leave">On Leave</option>
                                        <option value="withdrawn">Withdrawn</option>
                                        <option value="suspended">Suspended</option>
                                    </Field>
                                    <ErrorMessage name="academicStatus" component="div" className="text-danger" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="grade_level" className="form-label">Grade Level/Year</label>
                                    <Field name="gradeLevel" type="text" className="form-control" />
                                    <ErrorMessage name="gradeLevel" component="div" className="text-danger" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="major" className="form-label">Major/Program</label>
                                    <Field name="major" type="text" className="form-control" />
                                    <ErrorMessage name="major" component="div" className="text-danger" />
                                </div>
                            </div>

                            <div className="d-flex justify-content-between mt-4">
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Student'
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default StudentForm;