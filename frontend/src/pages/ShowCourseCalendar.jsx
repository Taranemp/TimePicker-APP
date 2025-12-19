import { useEffect, useState } from "react";
import apiService from "@/services/apiService.js";
import { Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {getUserInfo} from "@/services/StudentAuthService.js";
import {toaste} from '@/components/partitions/ToastNotifications.jsx'

async function handleRegisterStudentSlot(slotId, refreshData) {
    const student_id = localStorage.getItem('student_id');
    try {
        const result = await apiService("post", `/register-slot/`, {
            calendar_slot: slotId,
            student: student_id
        });

        if (result.data) {
            toaste.show("Success", "Data saved successfully!", 2500, 'success');
        } else if (result?.error?.response?.data?.message) {
            toaste.show("Failed !", result.error.response.data.message, 2500, 'danger');
        }

        refreshData();
    } catch (err) {
        alert(err?.response?.data?.error || "Failed to register slot");
    }
}

export default function ShowCourseCalendar() {
    // get course id
    const { id } = useParams();


    const [courseCalendar, setCourseCalendar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCalendar = async () => {
        setLoading(true);
        try {
            const result = await apiService("get", `/course/calendar/${id}`);
            if (result.data) setCourseCalendar(result.data);
            else setError(result.error);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCalendar();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data {error.message}</div>;

    const days = [...new Set(courseCalendar.calendar_slots.map(s => s.day))];
    const times = [...new Set(courseCalendar.calendar_slots.map(s => s.time))];

    const calendarMap = {};
    courseCalendar.calendar_slots.forEach(slot => {
        if (!calendarMap[slot.day]) calendarMap[slot.day] = {};
        calendarMap[slot.day][slot.time] = slot;
    });


    function is_selected(student_picks){
        const user_info = getUserInfo()
        const user_id = user_info.id
        const result = student_picks.some(item => parseInt(item.student.id) === parseInt(user_id));

        if (result){
            return true;
        } else {
            return false;
        }
    }


    return (
        <div>
            <div className="d-inline-block bg-primary my-0 mb-5 py-2 ps-4 pe-5 rounded-end-5">
                <p className="p-0 m-0 h4">{courseCalendar.title}</p>
            </div>

            <div className="mx-auto" style={{ maxWidth: "700px" }}>
                <Table borderless hover>
                    <thead>
                    <tr>
                        <th></th>
                        {times.map(time => (
                            <th className="text-center" key={time}>{time}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {days.map(day => (
                        <tr key={day}>
                            <td style={{ textTransform: "capitalize" }}>{day}</td>
                            {times.map(time => {
                                const slot = calendarMap[day]?.[time];
                                return (
                                    <td key={time} className="text-center">
                                        {slot ? (
                                            <Button
                                                // variant={slot.status ? "primary" : "secondary"}
                                                disabled={!slot.status}
                                                size="sm"
                                                className={`w-100 ${is_selected(slot.student_picks) ? 'btn-success' : 'btn-primary'}`}
                                                style={{ maxWidth: "100px" }}
                                                onClick={() => handleRegisterStudentSlot(slot.id, fetchCalendar)}
                                            >
                                                {slot.status ? `${slot.id} [${slot.count}]` : "..."}
                                            </Button>
                                        ) : (
                                            <Button variant="secondary" disabled size="sm">
                                                N/A
                                            </Button>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
