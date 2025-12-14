import {useEffect} from "react";
import apiService from "@/services/apiService.js";

export default function Courses() {
    useEffect(() => {
        const fetchCourses = async () => {
            const result = await apiService("get", "/courses/");
            if (result.data) {
                console.log("Data:", result.data);
            } else {
                console.error("Error:", result.error);
            }
        };

        fetchCourses();
    }, [])


    return (
      <div>
        Courses
      </div>
    )
  }