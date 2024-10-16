import axios from '@/api/axiosConfig'

export const login = async (username: string, password: string) => {
    const response = await axios.post('user/login', { username, password });

    localStorage.setItem('token', response.data.token);
    return response.data;
    }

export const register = async (username: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post('user/register', { username, password, firstName, lastName });
    return response.data;
}
