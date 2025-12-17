import { useEffect, useState } from "react";
import apiService from "@/services/apiService.js";
import { Table, Button } from "react-bootstrap";

import { useParams } from "react-router-dom";

export default function ShowCourseCalendar() {
    const { id } = useParams();

    const [courseCalendar, setCourseCalendar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await apiService("get",  `/course/calendar/${id}`); // your endpoint
            if (result.data) {
                setCourseCalendar(result.data);
            } else {
                setError(result.error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data {error.message}</div>;


    const days = [...new Set(courseCalendar.calendar_slots.map(s => s.day))];
    const times = [...new Set(courseCalendar.calendar_slots.map(s => s.time))];

    const calendarMap = {};
    courseCalendar.calendar_slots.forEach(slot => {
        if (!calendarMap[slot.day]) calendarMap[slot.day] = {};
        calendarMap[slot.day][slot.time] = slot;
    });

    return (
        <div>
            <div className="d-inline-block bg-primary my-0 mb-5 py-2 ps-4 pe-5 rounded-end-5">
                <p className="p-0 m-0 h4">
                    {courseCalendar.title}
                </p>
            </div>

            <div className="mx-auto" style={{ maxWidth: "700px" }}>
                <Table borderless hover>
                    <thead>
                    <tr>
                        <th></th>
                        {times.map(time => <th className="text-center" key={time}>{time}</th>)}
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
                                                variant={slot.status ? "primary" : "secondary"}
                                                disabled={!slot.status}
                                                size="sm"
                                                className="w-100"
                                                style={{maxWidth:'100px'}}
                                            >
                                                {slot.status ? "" : "..."}
                                                {slot.status ? slot.count : ""}

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
