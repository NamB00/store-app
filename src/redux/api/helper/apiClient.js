import axios from 'axios';

const apiClient = () => {
	// const { REACT_APP_API_URL } = process.env;
	//change param in products service
	// const REACT_APP_API_URL = 'http://localhost:4000/api/';
	const REACT_APP_API_URL = 'https://api.npoint.io/';
	const axiosData = axios.create({
		baseURL: REACT_APP_API_URL,
		responseType: 'json',
	});
	return axiosData;
};

export default apiClient;
