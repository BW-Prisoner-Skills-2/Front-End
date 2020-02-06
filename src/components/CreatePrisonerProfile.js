import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fetchActivity, isAdminReducer } from '../actions';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';

const Div = styled.div`
	background-color: #006e90;
	width: 95%;
	margin: 3%;
	padding: 1%;
	color: white;
	font-family: 'Roboto', sans-serif;
`;

const Input = styled.input`
	margin: 2%;
	padding: 1%;
	background-color: #c0c0c0;
	color: #006e90;
`;
const Form = styled.form`
	width: '95%';
	text-align: 'center';
	padding: 2%;
	margin: 2%;
	background-color: #006e90;
`;
const H2 = styled.h2`
	padding: 1%;
	text-align: 'center';
	background-color: #99c24d;
	color: #006e90;
`;
const H3 = styled.label`
	padding: 1%;
	text-align: 'center';
	margin: 0.25%;
	color: #c0c0c0;
`;

const wobble3 = keyframes`
	0% {
        transform: translateX(0px) translateY(0px);
	}
    100% {
        transform: translateX(-3px) translateY(3px);
    }
`;

const Button = styled.button`
	padding: 1%;
	text-align: 'center';
	margin-bottom: 5%;
	background-color: #99c24d;
	color: #006e90;
	box-shadow: 5px 5px 14px -8px #000000;
	font-family: 'Rubik', sans-serif;
	&:hover {
		animation: ${wobble3};
		animation-duration: 1s;
		animation-iteration-count: 1;
		animation-timing-function: linear;
		border: 3px solid #006e90;
	}
`;

const linkscolors = {
	color: '#FFFFFF',
	paddingTop: '5%',
	paddingBottom: '5%'
};
class CreatePrisonerProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleSubmit = (event, values) => {
		event.preventDefault();
		let canLeaveBoolean;
		if (this.props.canLeave === 'true' || this.props.canLeave === 'yes') {
			canLeaveBoolean = true;
		}
		if (this.props.canLeave === 'false' || this.props.canLeave === 'no') {
			canLeaveBoolean = false;
		}
		let newPrisoner = {
			name: this.props.name,
			can_leave: canLeaveBoolean
		};
		axiosWithAuth()
			.post(`/prisons/${this.props.prison[0][0]['id']}/prisoners`, newPrisoner)
			.then(res => {
				let prisonerID = res.data;
				let newSkill = {
					description: this.props.skillDescription
				};
				axiosWithAuth()
					.post(`/prisons/${this.props.prison[0][0]['id']}/prisoners/${prisonerID}/skills`, newSkill)
					.then(resp => {
						document.getElementById('statusmessage').style.color = '#c0c0c0';
						document.getElementById('statusmessage').textContent =
							'This prisoner has been added to your list.';
						document.getElementById('prisonerProfile').reset();
					})
					.catch(err => {
						console.log(err);
					});
			})
			.catch(err => {
				console.log(err);
			});
	};

	componentDidMount() {
		console.log('this.props match = ' + JSON.stringify(this.props.match));
		{
			this.props.prisonid && console.log('pp prison = ' + this.props.prison);
		}
	}
	render() {
		return (
			<Form id="prisonerProfile" onSubmit={this.handleSubmit}>
				<Header />
				<Link to="/prisonList" style={linkscolors}>
					<Button>back to list of prisons</Button>
				</Link>
				<Link
					to={`/prisons/${this.props.prison[0][0]['id']}`}
					prisonid={this.props.prison[0][0]['id']}
					formattedList={this.props.formattedlist}
					setFormattedList={this.props.setFormattedList}
					style={linkscolors}
					prison={this.props.prison}
					prisonid={this.props.prisonid}
					setPrisonID={this.props.setPrisonID}
				>
					<Button>back to prison profile</Button>
				</Link>
				<H2>Create a profile for a prisoner:</H2>
				<Div>
					<H3 htmlFor="name">Name: </H3>
					<Input
						type="text"
						name="name"
						onChange={event => this.props.setName(event.target.value)}
						placeholder="enter the prisoner's name"
					/>
				</Div>
				<Div>
					<H3 htmlFor="canLeave">Can Leave: </H3>
					<Input
						type="boolean"
						name="canLeave"
						onChange={event => this.props.setCanLeave(event.target.value)}
						placeholder="yes, no, true, or false"
					/>
				</Div>
				<Div>
					<H3 htmlFor="skillDescription">Add Skill: </H3>
					<Input
						type="text"
						name="skillDescription"
						onChange={event => this.props.setSkillDescription(event.target.value)}
						placeholder="add a skill"
					/>
				</Div>
				<Div>
					<div id="statusmessage" width="100%"></div>
					<Button type="submit">Submit</Button>
				</Div>
				<Footer />
			</Form>
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
		formattedlist: state.formattedlist,
		finalList: state.finalList,
		isLoading: state.isLoading
	};
};

export default connect(mapStateToProps, { fetchActivity, isAdminReducer })(CreatePrisonerProfile);
