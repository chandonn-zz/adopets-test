import React, { Component } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

interface Props {
	data: {
		id: number;
		name: string;
		breed: string;
		age: number;
		size: string;
	}
}

interface State {

}

class ListItem extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	transformSize(size: string) {
		switch(size) {
			case 'S': return 'Small';
			case 'M': return 'Medium port';
			case 'L': return 'Large';
			case 'XL': return 'Extra large';
		}
	}

	render() {
		const {
			id,
			name,
			breed,
			age,
			size,
		} = this.props.data;

		return (
			<Link to={`/details/${id}`} style={{ color: '#666', float: 'left', margin: 10 }}>
				<Card
					hoverable
					style={{ width: 250 }}
					cover={<img alt={name} src={require("../Resources/Images/dog-1.jpg")}/>}
				>
					<Meta title={name} description={breed} />
				</Card>
			</Link>
		)
	}
}

export default ListItem;