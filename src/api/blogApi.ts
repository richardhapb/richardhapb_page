import axios from '@/api/axiosConfig'

export const getBlogs = async () => {
    const response = await axios.get('/blog');
    return response.data;
}

export const getBlog = async (id: string) => {
    const response = await axios.get(`/blog/${id}`);
    return response.data;
}

export const createBlog = async (title: string, content: string) => {
    const response = await axios.post('/blog', { title, content });
    return response.data;
}

export const updateBlog = async (id: string, title: string, content: string) => {
    const response = await axios.put(`/blog/${id}`, { title, content });
    return response.data;
}

