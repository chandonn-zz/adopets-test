import React, { Component } from 'react';
import {
	Layout,
	Input,
	Radio,
	Pagination,
	Row,
	Button,
	Icon,
	Select
} from 'antd';
import ListItem from '../../Components/ListItem';
import { Pet } from '../../Store';

import { logoutUser, getPetsFromApi } from '../../Actions';

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
const { Option } = Select;

interface Props {
	onAuthStateChange: () => void;
}

interface State {
	sexKey: 'MALE' | 'FEMALE' | '';
	sizeKey: 'S' | 'M' | 'L' | 'XL' | '';
	ageKey: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR' | '';
	requestKey: string;
	results: Pet[];
	loading: boolean;
	pages: number;
	pageNumber: number;
	sort: string;
}

class SearchPage extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			sexKey: '',
			sizeKey: 'S',
			ageKey: '',
			requestKey: '',
			results: [],
			loading: false,
			pages: 0,
			pageNumber: 1,
			sort: ''
		}
	}

	componentDidMount() {
		const requestKey = sessionStorage.getItem('request_key');

		if (requestKey && requestKey !== '') {
			this.setState({ requestKey }, () => this.searchPets());
		}
	}

	finishSession() {
		const successfulLogout = logoutUser();

		if (successfulLogout) {
			this.props.onAuthStateChange();
		}
	}

	async searchPets() {
		const {
			sexKey,
			sizeKey,
			ageKey,
			requestKey,
			pageNumber,
			sort,
		} = this.state;

		this.setState({ loading: true });
		
		const { results, pages } = await getPetsFromApi(requestKey, sexKey, sizeKey, ageKey, pageNumber, sort);

		this.setState({ results, pages }, () => this.setState({ loading: false }));
	}

	changePage(pageNumber: number) {
		this.setState({ pageNumber }, () => this.searchPets());
	}

	changeSort(sort: string) {
		this.setState({ sort }, () => this.searchPets());
	}

	render() {
		const { results, loading, pages, pageNumber } = this.state;

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
								this.setState({
									sexKey: e.target.value,
									pageNumber: 1,
								}, () => this.searchPets())}
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
								this.setState({
									sizeKey: e.target.value,
									pageNumber: 1,
								}, () => this.searchPets())}
							}
							defaultValue="S"
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
								this.setState({
									ageKey: e.target.value,
									pageNumber: 1,
								}, () => this.searchPets())}
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
					<div className="add-margin-vertical">
						<p>Sort by</p>
						<Select
							onChange={(value: string) => this.changeSort(value)}
							defaultValue="name"
							style={{ width: 140 }}
						>
					    	<Option value="name">Name <Icon type="arrow-up" style={{ marginLeft: 10 }} /></Option>
					    	<Option value="-name">Name <Icon type="arrow-down" style={{ marginLeft: 10 }} /></Option>
					    	<Option value="price">Price <Icon type="arrow-up" style={{ marginLeft: 10 }} /></Option>
					    	<Option value="-price">Price <Icon type="arrow-down" style={{ marginLeft: 10 }} /></Option>
					    </Select>
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
								{results.length > 0 && results.map(result => (
									<ListItem key={result.id} pet={result} />
								))}

								{results.length < 1 &&
									(
										<p>No pet found.</p>
									)
								}
							</Row>

							{pages > 0 ?
							<Row type="flex" justify="center" style={{ margin: '40px 0' }}>
								<Pagination onChange={(value) => this.changePage(value)} defaultCurrent={pageNumber} total={pages * 10} />
							</Row> : null}
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