import React, { Component } from 'react';
import { Card, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Pet } from '../Store';
import DetailsModal from './DetailsModal';

const { Meta } = Card;

interface Props {
	pet: Pet;
}

interface State {
	modalVisible: boolean;
}

class ListItem extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			modalVisible: false,
		}
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
			breed_primary,
			age_key,
			size_key,
		} = this.props.pet;

		return (
			<div style={{ marginRight: 10 }}>
				<Card
					onClick={() => this.setState({ modalVisible: true })}
					hoverable
					style={{ width: 250 }}
					cover={<img alt={name} src={require("../Resources/Images/dog-1.jpg")}/>}
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
					<DetailsModal pet={this.props.pet} />
				</Modal>
			</div>
		)
	}
}

export default ListItem;