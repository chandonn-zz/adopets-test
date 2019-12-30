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

export const getPetsFromApi = async (
	request_key: string,
	sexKey: string,
	sizeKey: string,
	ageKey: string,
	pageNumber: number = 1,
	sort: string
) => {

	let request: any = {
	    "search":{
	        "_fields":[
	            "id",
	            "uuid",
	            "custom_code",
	            "name",
	            "specie_id",
	            "breed_primary_id",
	            "price",
	            "created_date",
	            "status_key",
	            "branch_id",
	            "payment_model_key",
	            "sex_key",
	            "size_key",
	            "age_key"
	        ],
	        "specie":{
	            "with":{
	                "_fields":[
	                    "id",
	                    "name"
	                ]
	            }
	        },
	        "breed_primary":{
	            "with":{
	                "_fields":[
	                    "id",
	                    "name"
	                ]
	            }
	        },
	        "branch":{
	            "with":{
	                "uuid":"ef71cadf-fa9b-4c8b-a1a8-0e31e784c3ff",
	                "_fields":[
	                    "id",
	                    "uuid"
	                ]
	            }
	        }
	    },
	    "options":{
	        "page": pageNumber,
	        "limit":5,
	        "sort":[]
	    }
	}

	// adding fields to filter, if set
	if (sexKey !== '') {
		request["search"]["sex_key"] = sexKey;
	}

    if (sizeKey !== '') {
    	request["search"]["size_key"] = sizeKey;
    }

    if (ageKey !== '') {
    	request["search"]["age_key"] = ageKey;
    }

    if (sort !== '') {
    	request["options"]["sort"] = [sort];
    }

	let response = await Axios.post(
		`${API_BASE_URL}pet/search`,
		request,
		{
			headers: { 'Authorization': 'Bearer ' + request_key }
		}
	);

	response = response.data;

	// fetch successful
	if (response.status === 200) {
		return {
			pages: response.data.pages,
			results: response.data.result,
		}
	} else {
		return {
			pages: 0,
			results: [],
		};
	}

}