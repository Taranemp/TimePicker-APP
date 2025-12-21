import apiService from "@/services/apiService.js";


export function getUserInfo() {
    const storedName = localStorage.getItem('student_name');
    const storedId = localStorage.getItem('student_id');

    if (storedName && storedId) {
        return {
            id: storedId,
            name: storedName,
        }
    }
    console.error('cant found user info')
}

export function isStudentLoggedIn() {
    const storedName = localStorage.getItem('student_name');
    const storedId = localStorage.getItem('student_id');

    if (storedName && storedId) { return true }
    return false;
}


export function isAdminLoggedIn() {
    const user_token = localStorage.getItem('user_token');

    if (user_token) { return true }
    return false;
}


export async function handleStudentLogout() {
    localStorage.removeItem("student_name");
    localStorage.removeItem("student_id");
    window.location.href = "/students-login";
}

export async function handleAdminLogout() {
    localStorage.removeItem("user_token");
    window.location.href = "/students-login";
}


export async function handleRegisterStudent(name) {
    try {
        const result = await apiService("post", `/students/`, {
            name: name,
        });

        if (result.data) {
            localStorage.setItem('student_name', result.data.name);
            localStorage.setItem('student_id', result.data.id);

            return {ok: true, data: result.data};
        } else {
            return {ok: false, error: "Unknown error"};
        }
    } catch (err) {
        return {ok: false, error: err?.response?.data || err.message};
    }
}

