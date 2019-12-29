import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { Icon, Button } from 'antd';

class Home extends Component {

	render() {
		return (
			<div>
				<video autoPlay muted loop id="bg-video">
					<source src={require('../../Resources/Images/cat_in_the_sun.mp4')} type="video/mp4" />
				</video>

				<div id="home-call">
					
					<h5 style={{ color: '#e52e6b', fontWeight: 'bold' }}>Enter the app and look for a new friend</h5>
					<h5 style={{ color: '#e52e6b', fontWeight: 'bold' }}>Made with <Icon type="heart" theme="filled" style={{ color: 'red', marginBottom: 10 }}/> using the Adopets API</h5>

					<Link to="/login">
						<Button>Enter app</Button>
					</Link>
				</div>
			</div>
		)
	}
}

export default Home;