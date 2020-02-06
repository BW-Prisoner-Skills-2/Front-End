import axios from 'axios';

export const axiosWithAuth = () => {
	return axios.create({
		// config object
		// https://prison-skills.herokuapp.com/api/prisons/
		// http://localhost:5000
		baseURL: 'https://prison-skills.herokuapp.com/api',

		headers: {
			authorization: localStorage.getItem('token')
		}
	});
};
