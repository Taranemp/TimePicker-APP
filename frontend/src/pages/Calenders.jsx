import { useEffect, useState } from "react";
import apiService from "@/services/apiService.js";
import { Table, Button } from "react-bootstrap";

export default function Calendar() {
    const [calenders, setCalenders] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await apiService("get", "/slots/"); // your endpoint
            if (result.data) {
                setCalenders(result.data);
            } else {
                setError(result.error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div>
            {Object.entries(calenders).map(([courseId, slots]) => {
                const days = [...new Set(slots.map(slot => slot.day))];
                const times = [...new Set(slots.map(slot => slot.time))];
                const slotMap = {};
                slots.forEach(slot => {
                    if (!slotMap[slot.day]) slotMap[slot.day] = {};
                    slotMap[slot.day][slot.time] = slot;
                });


                return (
                    <div key={courseId} className="mb-5">
                        <h4>{courseId}</h4>
                        <Table className="table-borderless table-hover text-center">
                            <thead>
                            <tr>
                                <th>Day / Time</th>
                                {times.map(time => (
                                    <th key={time}>{time}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {days.map(day => (
                                <tr key={day}>
                                    <td>{day.toLocaleUpperCase()}</td>
                                    {times.map(time => {
                                        const slot = slotMap[day]?.[time];
                                        return (
                                            <td key={time}>
                                                {slot ? (
                                                    <Button
                                                        variant={slot.status ? "primary" : "secondary"}
                                                        size="sm"
                                                        disabled={!slot.status}
                                                    >
                                                        {slot.count > 0 ? `${slot.count} picked` : "Available"}
                                                    </Button>
                                                ) : (
                                                    <span>-</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                );
            })}
        </div>
    );
}
