import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "../presentation/auth/auth";
import PrivateRoute from "./private_route";
import HomePage from "../presentation/main/main_screen";
import StudentsPage from "../presentation/students/students_page";
import SubjectsPage from "../presentation/subjects/subjects_page";
import GradePage from "../presentation/set_grade/set_grade";
import StudentGradesPage from "../presentation/students/grades/students_grades";

const MyRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/students"
          element={
            <PrivateRoute>
              <StudentsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <PrivateRoute>
              <SubjectsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/grade_page"
          element={
            <PrivateRoute>
              <GradePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/student_grade_page/:studentId"
          element={
            <PrivateRoute>
              <StudentGradesPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default MyRouter;
