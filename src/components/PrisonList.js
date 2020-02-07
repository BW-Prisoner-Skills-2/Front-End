import React, { useEffect } from 'react';
import styled from 'styled-components';
import IndividualPrisonListItem from './IndividualPrisonListItem';
import { fetchActivity, isAdminReducer } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Login from './Login';
import LoginPage from '../pages/login/LoginPage';
import LHeader from './header/Header'; //---<

const Div = styled.div`
	background-color: #006e90;
	width: 95%;
	margin: 3%;
	padding: 1%;
	color: #c0c0c0;
	font-family: 'Roboto', sans-serif;
`;
function PrisonList(props) {
	useEffect(() => {
		props.fetchActivity();
	}, []); //, []

	if (localStorage.getItem('token')) {
		return (
			<Div>
				<IndividualPrisonListItem
					key={props.prisonList}
					prisonList={props.prisonList}
					finalList={() => {
						props.finalList.filter((x, i, a) => a.indexOf(x) === i);
					}}
					formattedlist={props.formattedlist}
					setPrisonID={props.setPrisonID}
					setFormattedList={props.setFormattedList}
					setPrison={props.setPrison}
					prison={props.prison}
					prisonid={props.prisonid}
					isAdmin={props.isAdmin}
					setIsAdmin={props.setIsAdmin}
					isLoggedIn={props.isLoggedIn}
					setIsLoggedIn={props.setIsLoggedIn}
				/>
			</Div>
		); //
	} else {
		return (
			<Div className="row">
				<LHeader />
				<IndividualPrisonListItem
					key={props.prisonList}
					prisonList={props.prisonList}
					finalList={() => {
						props.finalList.filter((x, i, a) => a.indexOf(x) === i);
					}}
					formattedlist={props.formattedlist}
					setPrisonID={props.setPrisonID}
					setFormattedList={props.setFormattedList}
					setPrison={props.setPrison}
					prison={props.prison}
					prisonid={props.prisonid}
					isAdmin={props.isAdmin}
					setIsAdmin={props.setIsAdmin}
					isLoggedIn={props.isLoggedIn}
					setIsLoggedIn={props.setIsLoggedIn}
				/>
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
		formattedlist: state.formattedlist,
		finalList: state.finalList,
		isAdmin: state.isAdmin,
		isLoading: state.isLoading
	};
};

export default connect(mapStateToProps, { fetchActivity, isAdminReducer })(PrisonList);
