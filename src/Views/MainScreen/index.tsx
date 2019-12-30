import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Link,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { Layout, Icon } from 'antd';
import Home from '../Home';
import Login from '../Login';
import SearchPage from '../SearchPage';

interface State {
	user: { email: string; requestKey: string } | null;
}

interface Props {

}

class MainScreen extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			user: null
		}

		this.onAuthStateChange = this.onAuthStateChange.bind(this);
	}

	componentDidMount() {
		this.onAuthStateChange();
	}

	onAuthStateChange() {
		const email = sessionStorage.getItem('email');
		const requestKey = sessionStorage.getItem('request_key');

		if (requestKey && email) {
			this.setState({
				user : { email, requestKey }
			});
		} else {
			this.setState({
				user : { email: '', requestKey: '' }
			});
		}
	}

	render() {
		if (!this.state.user) {
			return (
				<Layout>
					<div className="container container-center" style={{ backgroundColor: '#e52e6b', minWidth: '100vw' }}>
						<Icon type="loading" style={{ fontSize: 30, color: '#fff' }}/>
					</div>
				</Layout>
			)
		}
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						{this.state.user.requestKey === '' ?
							<Home /> : <Redirect to={{ pathname: '/search' }} />
						}
					</Route>
					<Route path="/login">
						{this.state.user.requestKey === '' ?
							<Login onAuthStateChange={this.onAuthStateChange} /> : <Redirect to={{ pathname: '/search' }} />
						}
					</Route>
					<Route path="/search">
						{this.state.user.requestKey !== '' ?
							<SearchPage onAuthStateChange={this.onAuthStateChange} /> : <Redirect to={{ pathname: '/login' }} />
						}
					</Route>
				</Switch>
			</Router>
		)		
	}
}

export default MainScreen;