import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const patientsApi = {
  list: () => api.get('/patients/'),
  create: (data: any) => api.post('/patients/', data),
};

export const samplesApi = {
  create: (data: any) => api.post('/samples/', data),
  updateStatus: (id: string, status: string) => api.patch(`/samples/${id}/status`, { status }),
};

export const authApi = {
  login: (data: any) => api.post('/login', data),
  register: (data: any) => api.post('/register', data),
};

export default api;
