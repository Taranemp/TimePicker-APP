import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Layout from '@/Layout.jsx';
import Students from '@/pages/Students.jsx';
import Courses from '@/pages/Courses.jsx';
import ShowCourseCalendar from '@/pages/ShowCourseCalendar.jsx';

function App() {
  console.log('run');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Courses />} />
            <Route path="/students" element={<Students />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/calendar/:id" element={<ShowCourseCalendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
