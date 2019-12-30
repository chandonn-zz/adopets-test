import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { Pet } from '../Store';

interface Props {
	pet: Pet;
}

function DetailsModal(props: Props) {
	const { pet } = props;

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
			alignItems: 'center',
			flexDirection: 'column',
			justifyContent: 'center',
		}}>
			<div className="details-image-container">
				<img className="details-image" src={require('../Resources/Images/dog-1.jpg')} />
			</div>
			<p>Breed: {pet.breed_primary.name}</p>
			<p>{pet.age_key.toLowerCase()} pet</p>
			<p>Size: {transformSize(pet.size_key)}</p>
		</div>
	)
}

export default DetailsModal;