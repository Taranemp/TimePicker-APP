import {useEffect, useState} from "react";
import apiService from "@/services/apiService.js";
import {Button} from "react-bootstrap";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            const result = await apiService("get", "/students/");
            if (result.data) {
                setStudents(result.data);
            } else {
                setError(result.error);
            }
            setLoading(false);
        };
        fetchStudents();
    }, [])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading students</div>;

    return (
        <div className="mx-auto">
            <div className="d-inline-block bg-primary my-0 mb-5 py-2 ps-4 pe-5 rounded-end-5">
                <p className="p-0 m-0 h4">Students List</p>
            </div>
            <div className="row mx-auto">
                {students.map((student) => (
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 xol-xxl-1 p-1">
                        <Button key={student.id} variant="secondary" size="sm" className="overflow-hidden text-nowrap w-100">
                            {student.name}
                        </Button>
                    </div>
                ))}
            </div>

        </div>
    )
}