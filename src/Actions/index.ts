export const auth = () => {
	return false
}

export const createUser = () => {
	return false
}

export const loginUser = async (name: string, password: string) => {
	let posts = await fetch('https://jsonplaceholder.typicode.com/posts');
	posts = await posts.json();

	console.log(posts)
}

export const logoutUser = () => {
	return false
}

export const searchPets = () => {
	return false
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