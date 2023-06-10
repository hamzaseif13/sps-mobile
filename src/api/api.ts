import axios from 'axios'
export const globalAPi = axios.create({
    baseURL:"http://192.168.1.13:80/api/v1"
})