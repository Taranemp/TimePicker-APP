import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const apiService = async (method, path, data = null) => {
    try {
        const response = await axios({
            method,
            url: `${API_BASE_URL}${path}`,
            data, // for POST/PUT requests
            headers: {
                "Content-Type": "application/json",
            },
        });

        return { data: response.data };
    } catch (error) {
        return { 'error': error };
    }
};

export default apiService;
