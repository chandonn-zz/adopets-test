import React, { Component } from 'react';
import {
	Button,
	Form,
	Input,
	Icon
} from 'antd';

interface State {
	method: 'login' | 'register';
	name: string;
	password: string;
	repassword: string;
}

interface Props {

}

class Login extends Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			method: 'login',
			name: '',
			password: '',
			repassword: '',
		}
	}

	render() {
		const { method } = this.state;

		return (
			<div className="container container-center">
				{method === 'login' ?
					(<div >
						<h3>Login</h3>
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
						<Button type="primary">Login</Button>
						
						<div className="separator" />

						<div>
							<span>Don't have an account?</span>
							<Button type="link" onClick={() => this.setState({ method: 'register' })}>Register here</Button>						
						</div>
					</div>)
					:
					(<div>
						<h3>Register</h3>
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
			            	placeholder="Repeat password"
			            	type="password"
			            	onChange={(e) => this.setState({ repassword: e.target.value })}
			            />

						<Button type="primary">Create Account</Button>

						<div className="separator" />

						<div>
							<span>Have an account?</span>
							<Button type="link" onClick={() => this.setState({ method: 'login' })}>Login here</Button>						
						</div>
					</div>)
				}
			</div>
		)		
	}
}

export default Login;