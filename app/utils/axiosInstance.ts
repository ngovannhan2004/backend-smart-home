// api/axiosClient.ts
import axios from 'axios';
console.log(process.env.EXPO_PUBLIC_API_URL);

const axiosClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },

});
export default axiosClient;
