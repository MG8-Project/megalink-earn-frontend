import axios from 'axios';

const API = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});
API.interceptors.request.use(
	(config) => {
		if (!config.headers) {
			config.headers = null;
		}
		const token = localStorage.getItem('userToken');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
API.interceptors.response.use(
	(response) => {
    const cookies = response.headers['set-cookie'] || [];
    const accessToken = cookies.find(cookie => cookie.startsWith('accessToken'));
    const refreshToken = cookies.find(cookie => cookie.startsWith('refreshToken'));

    if (accessToken && refreshToken) {
      const accessTokenValue = accessToken.split(';')[0].split('=')[1];
      const refreshTokenValue = refreshToken.split(';')[0].split('=')[1];
      localStorage.setItem('accessToken', accessTokenValue);
      localStorage.setItem('refreshToken', refreshTokenValue);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;