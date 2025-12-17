import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter, Routes, Route, Link, useLocation, Navigate} from 'react-router-dom';
import './App.css'

import Layout from '@/Layout.jsx';
import Students from '@/pages/Students.jsx';
import ShowCourseList from '@/pages/ShowCourseList.jsx';
import ShowCourseCalendar from '@/pages/ShowCourseCalendar.jsx';
import StudentLogin from "@/pages/StudentLogin.jsx";

import { isStudentLoggedIn } from "@/services/StudentAuthService.js";



function ProtectedRoute({ children }) {
    const location = useLocation();
    const isLoggedIn = isStudentLoggedIn();

    if (!isLoggedIn) {
        return <Navigate to="/students-login" replace state={{ from: location }} />;
    }

    return children;
}

function App() {
    const isLoggedIn = isStudentLoggedIn();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/students-login"
                    element={isLoggedIn ? <Navigate to="/" replace /> : <StudentLogin />}
                />

                <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                    <Route index element={<ShowCourseList />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/courses" element={<ShowCourseList />} />
                    <Route path="/course/calendar/:id" element={<ShowCourseCalendar />} />
                </Route>

            </Routes>
        </BrowserRouter>
  )
}

export default App
