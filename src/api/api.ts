import axios from 'axios'
export const globalAPi = axios.create({
    baseURL:"http://www.whatever-domain.tech/api/v1"
})
/* http://www.whatever-domain.tech/api/v1 */