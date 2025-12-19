import apiService from "@/services/apiService.js";


export function getUserInfo() {
    const storedName = localStorage.getItem('student_name');
    const storedNumber = localStorage.getItem('student_phone');
    const storedId = localStorage.getItem('student_id');

    if (storedName && storedNumber && storedId) {
        return {
            id: storedId,
            name: storedName,
            phone: storedNumber,
        }
    }
    console.error('cant found user info')
}

export function isStudentLoggedIn() {
    const storedName = localStorage.getItem('student_name');
    const storedNumber = localStorage.getItem('student_phone');
    const storedId = localStorage.getItem('student_id');

    if (storedName && storedNumber && storedId) { return true }
    return false;
}


export async function handleStudentLogout() {
    localStorage.removeItem("student_name");
    localStorage.removeItem("student_phone");
    localStorage.removeItem("student_id");
    window.location.href = "/students-login";
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

