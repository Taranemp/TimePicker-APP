import apiService from "@/services/apiService.js";

export function isStudentLoggedIn() {
    const storedName = localStorage.getItem('student_name');
    const storedNumber = localStorage.getItem('student_phone');
    const storedId = localStorage.getItem('student_id');

    if (storedName && storedNumber && storedId) {
        return true;
    }

    return false;
}


export async function handleStudentLogout() {
    localStorage.removeItem("student_name");
    localStorage.removeItem("student_phone");
    localStorage.removeItem("student_id");
    window.location.href = "/students-login";

    // Reminder: we supposed to delete user, but we shouldent
    //     -----------------------------------------------------------------------
    // const student_id = localStorage.getItem('student_id');
    //
    // if (!student_id) {
    //     localStorage.removeItem("student_name");
    //     localStorage.removeItem("student_phone");
    //     localStorage.removeItem("student_id");
    //     window.location.href = "/students-login";
    //     return { ok: false, error: "No student info found" };
    // }
    //
    // try {
    //     const result = await apiService("delete", `/students/${student_id}/`);
    //
    //     if (result.data?.ok) {
    //         localStorage.removeItem("student_name");
    //         localStorage.removeItem("student_phone");
    //         localStorage.removeItem("student_id");
    //         window.location.href = "/students-login";
    //         return { ok: true };
    //     } else {
    //         return { ok: false, error: "Unknown error" };
    //     }
    // } catch (err) {
    //     return { ok: false, error: err?.response?.statusText || err.message };
    // }

}


export async function handleRegisterStudent(name, phone) {

    try {
        const result = await apiService("post", `/students/`, {
            name: name,
            phone: phone
        });

        if (result.data) {
            localStorage.setItem('student_name', result.data.name);
            localStorage.setItem('student_phone', result.data.phone);
            localStorage.setItem('student_id', result.data.id);

            return {ok: true, data: result.data};
        } else {
            return {ok: false, error: "Unknown error"};
        }
    } catch (err) {
        return {ok: false, error: err?.response?.data || err.message};
    }
}

