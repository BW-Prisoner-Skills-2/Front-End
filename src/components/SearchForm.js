import React, { useState, useEffect } from 'react';
import { fetchActivity, isAdminReducer } from '../actions';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
//	border: 3px solid #006e90;
//	box-shadow: 5px 5px 14px -8px #000000;

const Div = styled.div`
	background-color: #006e90;
	width: 65%;
	margin: 3% 3% 3% 16%;
	padding: 1%;
	color: #99c24d;
	font-family: 'Roboto', sans-serif;
	box-shadow: 5px 5px 14px -8px #000000;
	&:hover {
		border: 3px solid #99c24d;
	}
`;
const H4 = styled.h4`
	font-family: 'Rubik', sans-serif;
`;

const Input = styled.input`
	margin: 2%;
	padding: 1%;
	background-color: #c0c0c0;
	color: #006e90;
`;
const SearchForm = props => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		props.fetchActivity();

		const results = props.formattedlist.filter(
			prison =>
				prison[0][0]['name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
				prison[0][0]['address'].toLowerCase().includes(searchTerm.toLowerCase()) ||
				prison[0][0]['zipcode'].toString().includes(searchTerm.toString()) ||
				prison[2][0].toLowerCase().includes(searchTerm.toLowerCase()) ||
				prison[2][1].toLowerCase().includes(searchTerm.toLowerCase()) ||
				prison[1][0]['name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
				prison[1][1]['name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
				prison[1][2]['name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
				prison[1][2]['skills'][0]['description'].toLowerCase().includes(searchTerm.toLowerCase()) ||
				prison[1][2]['skills'][1]['description'].toLowerCase().includes(searchTerm.toLowerCase()) ||
				prison[1][1]['skills'][0]['description'].toLowerCase().includes(searchTerm.toLowerCase()) ||
				prison[1][1]['skills'][1]['description'].toLowerCase().includes(searchTerm.toLowerCase()) ||
				prison[1][0]['skills'][0]['description'].toLowerCase().includes(searchTerm.toLowerCase()) ||
				prison[1][0]['skills'][1]['description'].toLowerCase().includes(searchTerm.toLowerCase())
		);
		setSearchResults(results);
	}, [searchTerm]);
	//

	const handleChange = event => {
		setSearchTerm(event.target.value);
	};

	return (
		<section className="search-form">
			<form>
				<h4>Search by prison name, address, zip code, prisoner name, or prisoner skill.</h4>
				<label htmlFor="name">Search:</label>
				<Input
					id="name"
					type="text"
					name="textfield"
					placeholder="Search"
					value={searchTerm}
					onChange={handleChange}
				/>
			</form>
			<div>
				{Array.from(new Set(searchResults.map(a => a[0][0]['name'])))
					.map(name => {
						return searchResults.find(a => a[0][0]['name'] === name);
					})

					.map(prison => (
						<Div id="prison">
							<div>{prison[0][0]['name']}</div>

							<div>
								{prison[2][0]}, {prison[2][1]}
								<div>Prisoners Available for Work: {prison[0][0]['population'][0]['prisoners']}</div>
							</div>
						</Div>
					))}
			</div>
		</section>
	);
};

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
		isAdmin: state.isAdmin,
		isLoading: state.isLoading
	};
};

export default connect(mapStateToProps, { fetchActivity, isAdminReducer })(SearchForm);
