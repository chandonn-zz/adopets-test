import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Link,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import Home from '../Home';
import Login from '../Login';
import SearchPage from '../SearchPage';
import DetailsPage from '../DetailsPage';

interface State {
	user: boolean;
}

interface Props {

}

class MainScreen extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			user: true
		}
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/search">
						{this.state.user ?
							<SearchPage /> : <Redirect to={{ pathname: '/login' }} />
						}
					</Route>
					<Route path="/details/:id" component={DetailsPage} />
				</Switch>
			</Router>
		)		
	}
}

export default MainScreen;