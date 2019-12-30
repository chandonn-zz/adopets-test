import React, { Component } from 'react';
import { Layout, Input, Radio, Pagination, Row, Button, Icon } from 'antd';
import ListItem from '../../Components/ListItem';

import { logoutUser, data, getPetsFromApi } from '../../Actions';

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

interface Props {
	onAuthStateChange: () => void;
}

interface State {
	searchCode: string;
	sexKey: 'MALE' | 'FEMALE' | '';
	sizeKey: 'S' | 'M' | 'L' | 'XL' | '';
	ageKey: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR' | '';
	requestKey: string;
	results: any;
	loading: boolean;
}

class SearchPage extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			searchCode: '',
			sexKey: '',
			sizeKey: '',
			ageKey: '',
			requestKey: '',
			results: [],
			loading: false,
		}
	}

	componentDidMount() {
		const requestKey = sessionStorage.getItem('request_key');

		if (requestKey && requestKey !== '') {
			this.setState({ requestKey });
			console.log(requestKey)
		}
	}

	finishSession() {
		const successfulLogout = logoutUser();

		if (successfulLogout) {
			this.props.onAuthStateChange();
		}
	}

	searchPets() {
		const {
			sexKey,
			sizeKey,
			ageKey,
			searchCode
		} = this.state;

		this.setState({ loading: true });
		
		const pets = getPetsFromApi(searchCode, sexKey, sizeKey, ageKey);

		if (pets.length) {
			this.setState({ results: pets }, () => this.setState({ loading: false }));
		}

		this.setState({ loading: false });
	}

	render() {
		const { results, loading } = this.state;
		console.log(results)

		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					width={300}
					style={{
						background: '#ffffff',
						padding: 20,
						position: 'fixed',
						height: '100%',
						paddingTop: 100
					}}
				>
					<div className="add-margin-vertical">
						<p style={{ fontWeight: 'bold' }}>
							How do you want your friend to be like?
						</p>
						<p>Sex</p>
						<Radio.Group
							onChange={e => {
								this.setState({ sexKey: e.target.value }, () => this.searchPets())}
							}
							defaultValue=""
							buttonStyle="solid"
							size="small"
						>
							<Radio.Button value="MALE">Male</Radio.Button>
							<Radio.Button value="FEMALE">Female</Radio.Button>
						</Radio.Group>
					</div>
					<div className="add-margin-vertical">
						<p>Size</p>
						<Radio.Group
							onChange={e => {
								this.setState({ sizeKey: e.target.value }, () => this.searchPets())}
							}
							defaultValue=""
							buttonStyle="solid"
							size="small"
						>
							<Radio.Button value="S">Small</Radio.Button>
							<Radio.Button value="M">Medium</Radio.Button>
							<Radio.Button value="L">Large</Radio.Button>
							<Radio.Button value="XL">Extra large</Radio.Button>
						</Radio.Group>
					</div>
					<div className="add-margin-vertical">
						<p>Age</p>
						<Radio.Group
							onChange={e => {
								this.setState({ ageKey: e.target.value }, () => this.searchPets())}
							}
							defaultValue=""
							buttonStyle="solid"
							size="small"
						>
							<Radio.Button value="BABY">Baby</Radio.Button>
							<Radio.Button value="YOUNG">Young</Radio.Button>
							<Radio.Button value="ADULT">Adult</Radio.Button>
							<Radio.Button value="SENIOR">Senior</Radio.Button>
						</Radio.Group>
					</div>
				</Sider>
				<Layout style={{ marginLeft: 300 }}>
					<Header style={{ width: '100%', height: 100, background: '#ffffff', position: 'fixed', zIndex: 2, padding: 0 }}>
						<div id="logout-container">
							<Button style={{ marginTop: 5 }} onClick={() => this.finishSession()} icon="logout">
								<span>Logout</span>
							</Button>
						</div>
						<div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
							<Search
								placeholder="Search pets"
								onSearch={value => this.searchPets()}
								enterButton
								style={{ maxWidth: '300px' }}
								onChange={e => this.setState({ searchCode: e.target.value })}
							/>
						</div>
					</Header>
					{loading ?
						(<Content style={{ background: '#ffffff', marginTop: 100 }}>
							<Row type="flex">
								<Icon type="loading" style={{ marginRight: 10 }}/>
								<p>Looking for pets...</p>
							</Row>
						</Content>) :
						(<Content style={{ background: '#ffffff', marginTop: 100 }}>
							<Row type="flex">
								{this.state.results.map((result: any) => (
									<div />
								))}
							</Row>

							<Row type="flex" justify="center" style={{ margin: '40px 0' }}>
								<Pagination onChange={(value) => console.log(value)} defaultCurrent={6} total={100} />
							</Row>
						</Content>)
					}
					<Footer style={{ background: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
						<p>Adopets Test App</p>
						<p>created by Alexandre Correa with ReactJS and AntDesign</p>
					</Footer>
				</Layout>
			</Layout>
		)		
	}
}

export default SearchPage;