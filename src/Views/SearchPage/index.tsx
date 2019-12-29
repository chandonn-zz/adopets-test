import React, { Component } from 'react';
import { Layout, Input, Radio, Pagination, Row } from 'antd';
import ListItem from '../../Components/ListItem';

import { data } from '../../Actions';

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

interface Props {

}

interface State {
	searchCode: string;
	sexKey: 'MALE' | 'FEMALE';
	sizeKey: 'S' | 'M' | 'L' | 'XL';
	ageKey: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR';
}

class SearchPage extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			searchCode: '',
			sexKey: 'MALE',
			sizeKey: 'S',
			ageKey: 'BABY'
		}
	}

	render() {
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
						<p>Sex</p>
						<Radio.Group
							onChange={e => this.setState({ sexKey: e.target.value })}
							defaultValue="MALE"
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
							onChange={e => this.setState({ sizeKey: e.target.value })}
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
							onChange={e => this.setState({ ageKey: e.target.value })}
							defaultValue="BABY"
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
						<div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
							<Search
								placeholder="Search pets"
								onSearch={value => console.log(value)}
								enterButton
								style={{ maxWidth: '300px' }}
								onChange={e => this.setState({ searchCode: e.target.value })}
							/>
						</div>
					</Header>
					<Content style={{ background: '#ffffff', marginTop: 100 }}>
						<Row type="flex">
							{data.map(result => (
								<ListItem data={result} />
							))}
						</Row>

						<Row type="flex" justify="center" style={{ margin: '40px 0' }}>
							<Pagination onChange={(value) => console.log(value)} defaultCurrent={6} total={100} />
						</Row>
					</Content>
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