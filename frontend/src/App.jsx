import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'

import Layout from '@/Layout.jsx';
import Students from '@/pages/Students.jsx';
import ShowCourseList from '@/pages/ShowCourseList.jsx';
import ShowCourseCalendar from '@/pages/ShowCourseCalendar.jsx';

function App() {
  console.log('run');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
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
