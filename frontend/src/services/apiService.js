import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

const apiService = async (method, path, data = null) => {
    const user_token = localStorage.getItem("user_token");

    try {
        const response = await axios({
            method,
            url: `${API_BASE_URL}${path}`,
            data,
            headers: {
                "Content-Type": "application/json",
                ...(user_token && { Authorization: `Token ${user_token}` })
            }
        });

        return { data: response.data };
    } catch (error) {
        return { error };
    }
};

export default apiService;
