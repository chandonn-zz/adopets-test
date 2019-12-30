import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

import { data } from '../../Actions';

function DetaisPage() {
	const { id } = useParams();
	const pet = data.filter(pet => id && pet.id === parseInt(id))[0];

	function transformSize(size: string) {
		switch(size) {
			case 'S': return 'Small';
			case 'M': return 'Medium port';
			case 'L': return 'Large';
			case 'XL': return 'Extra large';
		}
	}

	return (
		<div style={{
			display: 'flex',
			minWidth: '100vw',
			minHeight: '100vh',
			alignItems: 'center', 
			flexDirection: 'column',
			justifyContent: 'center',
		}}>
			<div className="details-image-container">
				<img className="details-image" src={require('../../Resources/Images/dog-1.jpg')} />
			</div>
			<p>This is {pet.name}</p>
			<p>he is a {pet.breed}</p>
			<p>is {pet.age} years old</p>
			<p>and is {transformSize(pet.size)} size</p>
		</div>
	)
}

export default DetaisPage;