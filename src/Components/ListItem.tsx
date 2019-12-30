import React, { Component } from 'react';
import { Card, Modal, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Pet } from '../Store';
import DetailsModal from './DetailsModal';

const { Meta } = Card;

interface Props {
	pet: Pet;
}

interface State {
	modalVisible: boolean;
	image: string;
}

class ListItem extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			modalVisible: false,
			image: '',
		}
	}

	transformSize(size: string) {
		switch(size) {
			case 'XS': return 'Extra Small';
			case 'S': return 'Small';
			case 'M': return 'Medium port';
			case 'L': return 'Large';
			case 'XL': return 'Extra large';
		}
	}

	componentDidMount() {
		fetch('https://source.unsplash.com/200x300/?pet').then(response => this.setState({ image: response.url }));
	}

	render() {
		const {
			id,
			name,
			breed_primary,
			age_key,
			size_key,
		} = this.props.pet;
		const { image } = this.state;

		if(image === '') {
			return (
				<div style={{ width: 100 }}>
					<Icon type="loading" />
				</div>
			)
		}

		return (
			<div style={{ marginRight: 10 }}>
				<Card
					onClick={() => this.setState({ modalVisible: true })}
					hoverable
					style={{ width: 250 }}
					cover={<img alt={name} src={image}/>}
				>
					<Meta title={name} description={breed_primary.name} />
				</Card>

				<Modal
					title={this.props.pet.name}
					centered
					visible={this.state.modalVisible}
					onOk={() => this.setState({ modalVisible: false })}
					onCancel={() => this.setState({ modalVisible: false })}
					footer={[
			            <Button type="primary" onClick={() => this.setState({ modalVisible: false })}>
			              Back
			            </Button>,
			        ]}
				>
					<DetailsModal pet={this.props.pet} image={image} />
				</Modal>
			</div>
		)
	}
}

export default ListItem;