import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { Pet } from '../Store';

interface Props {
	pet: Pet;
	image: string;
}

function DetailsModal(props: Props) {
	const { pet } = props;

	function transformSize(size: string) {
		switch(size) {
			case 'XS': return 'Extra Small';
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
				<img className="details-image" src={props.image} />
			</div>
			<p>Breed: {pet.breed_primary.name}</p>
			<p>Size: {transformSize(pet.size_key)}</p>
			<p>{pet.sex_key.toLowerCase()} pet</p>
			<p>{pet.age_key.toLowerCase()}</p>
		</div>
	)
}

export default DetailsModal;