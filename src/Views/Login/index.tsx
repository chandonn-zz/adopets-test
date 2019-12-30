import React, { Component } from 'react';
import {
	Alert,
	Button,
	Form,
	Input,
	Icon
} from 'antd';

import { loginUser } from '../../Actions';

interface State {
	method: 'login' | 'register';
	name: string;
	password: string;
	repassword: string;
	loading: boolean;
	error: boolean
}

interface Props {
	onAuthStateChange: () => void;
}

class Login extends Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			method: 'login',
			name: '',
			password: '',
			repassword: '',
			loading: false,
			error: false
		}
	}

	validate() {
		const { name, password, method, repassword } = this.state;
		let valid = true;

		if (method === 'login') {
			const regex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;

			valid = name !== '' && password !== '' && regex.test(name);

			this.setState({
				error: !valid
			});
		} else {
			valid = name !== '' && password !== '' && repassword === password;

			this.setState({
				error: !valid
			});

		}

		return valid;
	}

	async login() {
		if (!this.validate()) {
			return
		}

		this.setState({ loading: true });

		const { name, password } = this.state;

		const loginSuccessful = await loginUser(name, password);

		if (loginSuccessful) {
			this.props.onAuthStateChange();
		}

		this.setState({ loading: false });
	}

	render() {
		const { method, loading, error } = this.state;

		return (
			<div id="home-bg-image">
				<div id="login-overlay" />
				<div className="container container-center">
					{method === 'login' ?
						(<div style={{ zIndex: 10 }} >
							<h3 style={{ color: '#fff' }}>Login</h3>
							<Input
								className="add-margin-vertical"
				            	prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
				            	placeholder="Email"
				            	onChange={(e) => this.setState({ name: e.target.value })}
				            />
				            <Input
				            	className="add-margin-vertical"
				            	prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
				            	placeholder="Password"
				            	type="password"
				            	onChange={(e) => this.setState({ password: e.target.value })}
				            />

				            {error && method === 'login' ?
				            	<Alert style={{ marginBottom: 10 }} type="error" message="Wrong login credentials or user not found" />
				            : null }

							<Button
								onClick={() => this.login()}
								type="primary"
								loading={loading && method === 'login'}
							>Login</Button>

							<div>
								<span style={{ color: '#fff', marginRight: 10 }}>Don't have an account?</span>
								<Button onClick={() => this.setState({ method: 'register', error: false })}>Register here</Button>						
							</div>
						</div>)
						:
						(<div style={{ zIndex: 10 }}>
							<h3 style={{ color: '#fff' }}>Register</h3>
							<Input
								className="add-margin-vertical"
				            	prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
				            	placeholder="Email"
				            	onChange={(e) => this.setState({ name: e.target.value })}
				            />
				            <Input
				            	className="add-margin-vertical"
				            	prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
				            	placeholder="Password"
				            	type="password"
				            	onChange={(e) => this.setState({ password: e.target.value })}
				            />
				            <Input
				            	className="add-margin-vertical"
				            	prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
				            	placeholder="Repeat your password"
				            	type="password"
				            	onChange={(e) => this.setState({ repassword: e.target.value })}
				            />
				            {error && method === 'register' ?
				            	<Alert style={{ marginBottom: 10 }} type="error" message="The passwords must be the same" />
				            : null }

							<Button onClick={() => this.login()} type="primary">Create Account</Button>

							<div>
								<span style={{ color: '#fff', marginRight: 10 }}>Have an account?</span>
								<Button onClick={() => this.setState({ method: 'login', error: false })}>Login here</Button>						
							</div>
						</div>)
					}
				</div>
			</div>
		)		
	}
}

export default Login;