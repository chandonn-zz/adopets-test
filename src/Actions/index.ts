import Axios from 'axios';

const API_KEY = '505763d6-4202-4b05-9efc-93b366939bcf';
const API_BASE_URL = 'https://test.adopets.app/v1/';

export const loginUser = async (name: string, password: string) => {
	const response = await Axios.post(`${API_BASE_URL}auth/session-request`, { system_api_key: API_KEY });

	// successful request
	if (response.data.status === 200) {
		const token = response.data.data.access_key;

		const register = await Axios.post(
			`${API_BASE_URL}auth/session-register`,
			{
				organization_user: {
					email: name,
					password: password
				}
			},
			{
				headers: { 'Authorization': "Bearer " + token }
			}
		)
		console.log(register)

		// successful session registration
		if (register.data.status === 200) {
			const user = {
				email: name,
				request_key: register.data.data.access_key,
			}

			// initiate session and save data to store
			sessionStorage.setItem('email', name);
			sessionStorage.setItem('request_key', register.data.data.access_key);
			
			return true;
		} else {
			return false;
		}
	}
}

export const logoutUser = () => {
	sessionStorage.clear();

	return true;
}

export const getPetsFromApi = (code: string, sexKey: string, sizeKey: string, ageKey: string) => {
	console.log(code, sexKey, sizeKey, ageKey)

	return [];
}

export const data = [
	{
		id: 0,
		name: 'Doggy 1',
		breed: 'Chowchow',
		age: 8,
		size: 'M'
	},
	{
		id: 1,
		name: 'Doggy 1',
		breed: 'Chowchow',
		age: 8,
		size: 'M'
	},
	{
		id: 2,
		name: 'Doggy 2',
		breed: 'Chowchow',
		age: 8,
		size: 'M'
	},
	{
		id: 3,
		name: 'Doggy 3',
		breed: 'Chowchow',
		age: 8,
		size: 'M'
	},
	{
		id: 4,
		name: 'Doggy 4',
		breed: 'Chowchow',
		age: 8,
		size: 'M'
	},
	{
		id: 5,
		name: 'Doggy 5',
		breed: 'Chowchow',
		age: 8,
		size: 'M'
	},
	{
		id: 6,
		name: 'Doggy 6',
		breed: 'Chowchow',
		age: 8,
		size: 'M'
	},
]