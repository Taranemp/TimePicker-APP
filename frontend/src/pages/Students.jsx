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
                console.error("Error:", result.error.message);
            }
            setLoading(false);
        };
        fetchStudents();
    }, [])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading students</div>;

    return (
        <div>
            <h3>Students</h3>
            <div className="my-4">
                {students.map((student) => (
                    <Button key={student.id} variant="primary" size="sm" className="mx-2 px-4">
                        {student.name}
                    </Button>
                ))}
            </div>

        </div>
    )
}