import {useEffect, useState} from "react";
import apiService from "@/services/apiService.js";
import {Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import {isAdminLoggedIn} from "@/services/AuthService.js";
import CreateCourseModal from "@/components/partitions/CreateCourseModal.jsx";


export default function ShowCourseList() {
    const adminIsLogged = isAdminLoggedIn();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    function goToCourseCalendar(id) {
        if (adminIsLogged) {
            navigate(`/admin/course/calendar/${id}`, {replace: true});
        } else {
            navigate(`/course/calendar/${id}`, {replace: true});
        }
    }

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await apiService("get", "/courses/");
            if (result.data) {
                setCourses(result.data);
            } else {
                setError(result.error);
            }
            setLoading(false);
        };
        fetchCourses();
    }, [])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading courses</div>;

    return (
        <div>
            <div className={'d-flex flex-row justify-content-between align-items-center mb-5'}>
                <div className="d-inline-block bg-primary py-2 ps-4 pe-5 rounded-end-5">
                    <p className="p-0 m-0 h4">Courses List</p>
                </div>
                {adminIsLogged &&
                    <div className="d-flex flex-row justify-content-start align-items-center">
                        <CreateCourseModal>
                            <Button
                                variant={'success'}
                                className="overflow-hidden text-nowrap w-100"
                            >
                                + Create
                            </Button>
                        </CreateCourseModal>
                    </div>
                }
            </div>
            <div className="row mx-auto">
                {courses.map((course) => (
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 xol-xxl-1 p-1" key={course.id}>
                        <Button
                            onClick={() => {
                                goToCourseCalendar(course.id)
                            }}
                            key={course.id}
                            variant="secondary"
                            size="sm"
                            className="overflow-hidden text-nowrap w-100"
                        >
                            {course.title}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}