import axios from "axios";

const token = `0066a12f-79b0-42ad-95f4-9076976f6fb5`
const apiKey = `ebeff7ea-2e1a-45b7-9bf7-df85f3d021c3`

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    }, // конфигурация запроса
})