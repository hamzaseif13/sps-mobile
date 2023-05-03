import axios from 'axios'
export const globalAPi = axios.create({
    baseURL:"http://192.168.1.13:8080/api/v1"
})