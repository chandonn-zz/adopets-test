import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

import { data } from '../../Actions';

function DetaisPage() {
	const { id } = useParams();
	const pet = data.filter(pet => id && pet.id === parseInt(id))[0];

	return (
		<div>
			<span>{pet.name}</span>
			<span>{pet.breed}</span>
			<span>{pet.age}</span>
			<span>{pet.size}</span>
		</div>
	)
}

export default DetaisPage;