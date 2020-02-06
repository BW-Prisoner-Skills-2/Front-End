import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { fetchActivity } from '../actions';
import { connect } from 'react-redux';

const Div = styled.div`
	background-color: #006e90;
	width: 100%;
	margin: 2%;
	padding: 1%;
`;
const Input = styled.input`
	margin: 2%;
	padding: 1%;
	background-color: #c0c0c0;
	color: #006e90;
`;
const Form = styled.form`
	padding: 2%;
	margin: 2%;
	background-color: #006e90;
`;
const H3 = styled.h3`
	padding: 1%;
	text-align: 'center';
	margin: 0.25%;
	background-color: #006e90;
	color: #c0c0c0;
`; //006E90
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			credentials: {
				username: '',
				password: ''
			}
		};
	}

	handleChange = e => {
		this.setState({
			credentials: {
				...this.state.credentials,
				[e.target.name]: e.target.value
			}
		});
	};

	login = e => {
		e.preventDefault();
		axios
			.post('https://prison-skills.herokuapp.com/api/auth/login', this.state.credentials)
			.then(res => {
				localStorage.setItem('token', res.data.token);
				this.props.fetchActivity();
				this.props.history.push('/prisonList');
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<Div>
				<H3>Log In To Create, Delete, and Edit Prisoner Profiles: </H3>
				<Form onSubmit={this.login}>
					<Input
						type="text"
						name="username"
						value={this.state.credentials.username}
						onChange={this.handleChange}
					/>
					<Input
						type="password"
						name="password"
						value={this.state.credentials.password}
						onChange={this.handleChange}
					/>
					<button>Log in</button>
				</Form>
			</Div>
		);
	}
}

const mapStateToProps = state => {
	return {
		prisonList: state.prisonList,
		prisonid: state.prisonid,
		error: state.error,
		prisonerList: state.prisonerList,
		allPrisonerList: state.allPrisonerList,
		allPrisonLocations: state.allPrisonLocations,
		finalList: state.finalList,
		isAdmin: state.isAdmin,
		isLoading: state.isLoading
	};
};

export default connect(mapStateToProps, { fetchActivity })(Login);
