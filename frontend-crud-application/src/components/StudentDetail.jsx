import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ApiService from '../services/api';

const StudentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
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
        };

        fetchStudent();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await ApiService.deleteStudent(id);
                navigate('/');
            } catch (err) {
                setError('Failed to delete student');
                console.error('Error deleting student:', err);
            }
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!student) return <div className="alert alert-warning">Student not found</div>;

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Student Detail</h2>
                <div>
                    <Link to="/" className="btn btn-secondary me-2">Back to List</Link>
                    <Link to={`/students/${id}/edit`} className="btn btn-warning me-2">Edit</Link>
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Personal Information</h4>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{student.id}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{student.firstName} {student.lastName}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{student.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{student.phoneNumber || '-'}</td>
                                </tr>

                                <tr>
                                    <th>Gender</th>
                                    <td>{student.gender || '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                        <h4>Academic Information</h4>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Grade Level</th>
                                    <td>{student.gradeLevel || '-'}</td>
                                </tr>
                                <tr>
                                    <th>Major</th>
                                    <td>{student.major || '-'}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        <span className={`badge bg-${student.academicStatus === 'active' ? 'success' : 'secondary'}`}>
                                            {student.academicStatus}
                                        </span>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-4">
                    <h4>Address</h4>
                    <p>
                        {student.address ? (
                            <>
                                {student.address}
                            </>
                        ) : (
                            'No address information available'
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;