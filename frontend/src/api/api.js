import axios from 'axios';

const api = axios.create();
api.defaults.headers.common['x-auth-token'] = localStorage.getItem('authToken');

export default api;
