import axios from "axios";
import toast from 'react-hot-toast'

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_APP_BASE_URL || "/api",
});

api.interceptors.request.use(function (config) {
    // spinning start to show
    toast.dismiss();
    toast.loading('Loading...');
    return config
}, function (error) {
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
    // spinning hide
    toast.dismiss();
    if (response.data?.result?.message) {
        toast.success(response.data.result.message);
    }
    return response;
}, function (error) {
    toast.dismiss();
    toast.error(error.response.data?.error?.message ?? error.message ?? "Something went wrong");
    return Promise.reject(error);
});


export default api;





