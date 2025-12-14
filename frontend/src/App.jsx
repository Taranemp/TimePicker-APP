import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Layout from '@/Layout.jsx';
import Home from '@/pages/Home.jsx';
import Students from '@/pages/Students.jsx';
import Courses from '@/pages/Courses.jsx';
import Calenders from '@/pages/Calenders.jsx';

function App() {
  console.log('run');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/calenders" element={<Calenders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
