import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetail from './components/StudentDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter >
      <div className="App ">
        <Navbar />
        <div className="container  mt-4">
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/students/create" element={<StudentForm />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/students/:id/edit" element={<StudentForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
