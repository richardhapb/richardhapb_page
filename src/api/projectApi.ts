import axios from '@/api/axiosConfig'

export const getProjects = async () => { 
    const response = await axios.get('/project');
    return response.data;
}

export const getProject = async (projectId: number) => {
    const response = await axios.get(`/project/${projectId}`);
    return response.data;
}

export const createProject = async (project: object) => {
    const response = await axios.post('/project', project);
    return response.data;
}

export const updateProject = async (projectId: number, project: object) => {
    const response = await axios.put(`/project/${projectId}`, project);
    return response.data;
}

