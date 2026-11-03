import { FormSubmit } from "@/types/form";
import axios from "axios";
import cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = cookies.get("authToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// add methods inside api obj to make common api calls

const getForm: (formId: string) => Promise<FormSubmit> = async (
    formId: string,
) => {
    try {
        const response = await api.get(`/forms/${formId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { api, getForm };
