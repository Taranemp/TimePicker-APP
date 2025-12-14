import {useEffect, useState} from "react";
import apiService from "@/services/apiService.js";
import {Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    function goToCourseCalendar(id) {
        navigate(`/course/calendar/${id}`, { replace: true });
    }

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await apiService("get", "/courses/");
            if (result.data) {
                setCourses(result.data);
            } else {
                setError(result.error);
                console.error("Error:", result.error.message);
            }
            setLoading(false);
        };
        fetchCourses();
    }, [])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading courses</div>;

    return (
      <div>
        <h3>Courses</h3>
          <div className="my-4">
              {courses.map((course) => (
                  <Button onClick={ () => { goToCourseCalendar(course.id) }} key={course.id} variant="primary" size="sm" className="mx-2 px-4">
                      {course.title}
                  </Button>
              ))}
          </div>
      </div>
    )
  }