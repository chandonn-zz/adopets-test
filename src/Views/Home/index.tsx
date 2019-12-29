import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

class Home extends Component {

	render() {
		return (
			<div className="container container-center">
				<p>App to search pets using the Adopets API</p>

				<Link to="/login">Enter app</Link>
			</div>
		)
	}
}

export default Home;