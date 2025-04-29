import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/api';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const response = await ApiService.getStudents();
                setStudents(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch students');
                setLoading(false);
                console.error('Error fetching students:', err);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await ApiService.deleteStudent(id);
                setStudents(students.filter(student => student.id !== id));
            } catch (err) {
                setError('Failed to delete student');
                console.error('Error deleting student:', err);
            }
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Student List</h2>
                <Link to="/students/create" className="btn btn-primary">Add Student</Link>
            </div>
            <div className="card-body">
                {students.length === 0 ? (
                    <p className="text-center">No students found</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Grade Level</th>
                                    <th>Major</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.firstName} {student.lastName}</td>
                                        <td>{student.email}</td>
                                        <td>{student.gradeLevel || '-'}</td>
                                        <td>{student.major || '-'}</td>
                                        <td>
                                            <span className={`badge bg-${student.academicStatus === 'active' ? 'success' : 'secondary'}`}>
                                                {student.academicStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="btn-group btn-group-sm">
                                                <Link to={`/students/${student.id}`} className="btn btn-info">View</Link>
                                                <Link to={`/students/${student.id}/edit`} className="btn btn-warning">Edit</Link>
                                                <button onClick={() => handleDelete(student.id)} className="btn btn-danger">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentList;