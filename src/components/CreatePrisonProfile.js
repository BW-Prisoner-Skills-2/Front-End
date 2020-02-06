import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchActivity } from '../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from './Header';

const Div = styled.div`
	background-color: #1c2826;
	width: 95%;
	margin: 2%;
	padding: 1%;
	font-family: 'Roboto', sans-serif;
`;
const Input = styled.input`
	margin: 2%;
	padding: 1%;
	background-color: #d64550;
	color: #1c2826;
`;
const Form = styled.form`
	width: '95%';
	text-align: 'center';
	padding: 2%;
	margin: 2%;
	background-color: #1c2826;
`;

const inline = {
	width: '30%',
	display: 'flex',
	wrap: 'nowrap',
	flexDirection: 'column'
};
const H2 = styled.h2`
	padding: 1%;
	text-align: 'center';
	background-color: #d64550;
	color: #1c2826;
`;
const H3 = styled.label`
	padding: 1%;
	text-align: 'center';
	margin: 0.25%;
	background-color: #1c2826;
	color: #daefb3;
`;
const Button = styled.button`
	padding: 1%;
	text-align: 'center';
	margin-left: 25%;
	margin-bottom: 5%;
	background-color: #99c24d;
	color: #1c2826;
	border: 3px solid #daefb3;
	box-shadow: 5px 5px 14px -8px #000000;
	font-family: 'Rubik', sans-serif;
`;
class CreatePrisonProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleSubmit = (event, values) => {
		event.preventDefault();
		console.log('address = ' + this.props.address);
		console.log('name = ' + this.props.name);
		console.log(`https://prison-skills.herokuapp.com/api/prisons`, {
			name: this.props.pName,
			address: this.props.address,
			zipcode: this.props.pZIP
		});
		let newPrison = {
			name: this.props.pName,
			address: this.props.address,
			zipcode: this.props.pZIP
		};
		axiosWithAuth()
			.post(`/prisons`, newPrison)
			// .post("https://weightliftingjournal1.herokuapp.com/api/auth/register", prisonerInfo)
			.then(res => {
				console.log(res.data);
				document.getElementById('statusmessage').style.color = 'white';
				document.getElementById('statusmessage').textContent = "This prison's info has been added.";
				window.location.href = '/prisonList';
			})
			.catch(err => {
				console.log(err);
			});
	};

	componentDidMount() {
		console.log('this.props match = ' + JSON.stringify(this.props.match));
		// this.props.setPrison(this.props.match.params);
		{
			this.props.prisonid && console.log('pp prison = ' + this.props.prison);
			console.log('PP prison = ' + JSON.stringify(this.props.prison));
			console.log('prisonid = ' + this.props.prisonid);
			console.dir(this.props.prison);
		}
	}
	render() {
		return (
			<Form id="prisonerProfile" onSubmit={this.handleSubmit}>
				<Link to={`/prisonList`}>back to list of prisons</Link>
				<H2>Create a profile for a prison:</H2>
				<Div>
					<H3 htmlFor="name">Name: </H3>
					<Input type="text" name="name" onChange={event => this.props.setPName(event.target.value)} />
				</Div>
				<Div>
					<H3 htmlFor="address">Address: </H3>
					<Input type="text" name="address" onChange={event => this.props.setAddress(event.target.value)} />
				</Div>
				<Div>
					<H3 htmlFor="pZIP">ZIP Code: </H3>
					<Input type="text" name="pZIP" onChange={event => this.props.setPZIP(event.target.value)} />
				</Div>
				<div id="statusmessage"></div>
				<Button type="submit">Submit</Button>
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

export default connect(mapStateToProps, { fetchActivity })(CreatePrisonerProfile);
