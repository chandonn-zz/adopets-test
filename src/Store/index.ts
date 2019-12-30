export interface Pet {
	id: number;
	name: string;
	uuid: string;
	custom_code: any;
	specie_id: number;
	breed_primary_id: number;
	price: string;
	created_date: string;
	status_key: string;
	branch_id: number;
	payment_model_key: string;
	sex_key: string;
	size_key: string;
	age_key: string;
	specie: {
		id: number;
		name: string;
	};
	branch: {
		id: number;
		uuid: string;
	};
	breed_primary: {
		id: number;
		name: string;
	}
}