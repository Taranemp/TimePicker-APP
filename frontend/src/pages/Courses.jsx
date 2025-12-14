import {useEffect, useState} from "react";
import apiService from "@/services/apiService.js";
import {Button} from "react-bootstrap";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                  <Button key={course.id} variant="primary" size="sm" className="mx-2 px-4">
                      {course.title}
                  </Button>
              ))}
          </div>
      </div>
    )
  }