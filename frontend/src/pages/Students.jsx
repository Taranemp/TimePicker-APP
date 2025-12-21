import {useEffect, useState} from "react";
import apiService from "@/services/apiService.js";
import {Button} from "react-bootstrap";
import AlertModal from "@/components/partitions/AlertModal.jsx";
import {toaste} from "@/components/partitions/ToastNotifications.jsx";

async function handleDeleteStudent(student_id, fetchStudents){
    try {
        const result = await apiService("delete", `/students/${student_id}/`);
        if (result.data) {
            toaste.show("Success", "Student deleted successfully!", 2500, 'success');
        } else if (result?.error?.response?.data?.message) {
            toaste.show("Failed !", result.error.response.data.message, 2500, 'danger');
        }
        fetchStudents();
    } catch (err) {
        alert(err?.response?.data?.error || "Failed to delete student");
    }

}
export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchStudents = async () => {
        const result = await apiService("get", "/students/");
        if (result.data) {
            setStudents(result.data);
        } else {
            setError(result.error);
        }
        setLoading(false);
    };


    useEffect(() => {
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
                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 xol-xxl-1 p-1" key={student.id}>
                        <AlertModal
                            message={`${student.name} will be deleted, fine ?`}
                            onConfirm={() => {
                                handleDeleteStudent(student.id, fetchStudents)
                            }}
                            buttonColor="danger"
                            confirmText="Delete"
                            cancelText="Cancel"
                        >
                            <Button
                                key={student.id}
                                variant="secondary"
                                size="sm"
                                className="overflow-hidden text-nowrap w-100">
                                {student.name}
                            </Button>
                        </AlertModal>
                    </div>
                ))}
            </div>
        </div>
    )
}