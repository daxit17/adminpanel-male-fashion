import { BASE_URL } from "../Base_Url/Base_url";
import axios from "axios";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 2000
});

const sendRequest = (config) => {
    return instance.request(config);
}

export const getRequest = (path) => {
    return sendRequest({
        method: "GET",
        url: path
    })
}

export const postRequest = (path, data) => {
    return sendRequest({
        method: "POST",
        url: path,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}