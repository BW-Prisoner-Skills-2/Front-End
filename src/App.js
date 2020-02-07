import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { fetchActivity, isAdminReducer } from './actions';
import { connect } from 'react-redux';
import PrisonList from './components/PrisonList';
import PrisonProfile from './components/PrisonProfile';
import CreatePrisonerProfile from './components/CreatePrisonerProfile';
import Login from './components/Login';
import { axiosWithAuth } from './utils/axiosWithAuth';


import LoginPage from "../src/pages/login/LoginPage";//---<

function App() {
	const [prisonid, setPrisonID] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [prisonList, setPrisonList] = useState([]);
	const [finalList, setFinalList] = useState([]);
	const [formattedlist, setFormattedList] = useState([]);
	const [prison, setPrison] = useState('');
	const [name, setName] = useState('');
	const [canLeave, setCanLeave] = useState('');
	const [skillDescription, setSkillDescription] = useState('');
	const [editing, setEditing] = useState(false);
	const [prisonerToEdit, setPrisonerToEdit] = useState({
		name: '',
		can_leave: '',
		description: ''
	});
	const [prisonerList, setPrisonerList] = useState([]);
	const [allPrisonerList, setAllPrisonerList] = useState([]);
	const [allPrisonLocations, setAllPrisonLocations] = useState([]);
	const [pName, setPName] = useState('');
	const [pZIP, setPZIP] = useState('');
	const [address, setAddress] = useState('');
	const [experienceDescription, setExperienceDescription] = useState('');
	const [experienceDate, setExperienceDate] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const editPrisoner = prisoner => {
		setEditing(true);
		setPrisonerToEdit(prisoner);
	};

	const saveEdit = e => {
		e.preventDefault();
		let canLeaveBoolean;
		if (prisonerToEdit.can_leave === 'true' || prisonerToEdit.can_leave === 'yes') {
			canLeaveBoolean = true;
		}
		if (prisonerToEdit.can_leave === 'false' || prisonerToEdit.can_leave === 'no') {
			canLeaveBoolean = false;
		}
		let editedPrisonerData = {
			name: prisonerToEdit.name,
			can_leave: canLeaveBoolean
		};
		let prisonerSkills = {
			description: prisonerToEdit.description
		};
		console.log(`/prisons/${prisonid}/prisoners/${prisonerToEdit.id}`, editedPrisonerData);
		axiosWithAuth()
			.put(`/prisons/${prisonid}/prisoners/${prisonerToEdit.id}`, editedPrisonerData)
			.then(res => {
				axiosWithAuth()
					.post(`/prisons/${prisonid}/prisoners/${prisonerToEdit.id}/skills`, prisonerSkills)
					.then(resp => {})
					.catch(err => console.log(err));

				setEditing(false);
				document.getElementById(`statusmessage${prisonerToEdit.id}`).style.color = 'white';
				document.getElementById(`statusmessage${prisonerToEdit.id}`).textContent =
					'This prisoner has been edited.';
			})
			.catch(err => console.log(err));
	};

	const getPrisonList = () => {
		axios
			.get('https://prison-skills.herokuapp.com/api/prisons/')
			.then(response => {
				setPrisonList(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};
	const formatFinalList = () => {
		let finalFormattedList = [];
		for (let x = 0; x < prisonList.length; x++) {
			finalFormattedList.push(finalList[x]);
		}
		setFormattedList(finalFormattedList);
	};

	useEffect(() => {
		getPrisonList();
		let finalFormattedList = [];
		for (let x = 0; x < prisonList.length; x++) {
			finalFormattedList.push(finalList[x]);
		}
		setFormattedList(finalFormattedList);
		setFormattedList(finalList.filter((x, i, a) => a.indexOf(x) === i));
	}, []);
	return (
		<Router>
			<div className="App">

				<Switch>
					<Route path="/prisonList">
						{!isLoading && formattedlist && (
							<PrisonList
								prisonid={prisonid}
								prisonList={prisonList}
								finalList={() => {
									finalList.filter((x, i, a) => a.indexOf(x) === i);
								}}
								formattedlist={formattedlist}
								setFormattedList={setFormattedList}
								fetchActivity={fetchActivity}
								setPrisonID={setPrisonID}
								setPrison={setPrison}
								prison={prison}
								isAdmin={isAdmin}
								setIsAdmin={setIsAdmin}
								isLoggedIn={isLoggedIn}
								setIsLoggedIn={setIsLoggedIn}
							/>
						)}
					</Route>
					<PrivateRoute path={`/prisons/${prisonid}`}>
						<PrisonProfile
							prisonid={prisonid}
							prison={prison}
							prisonList={prisonList}
							finalList={finalList}
							formattedlist={formattedlist}
							setFormattedList={setFormattedList}
							fetchActivity={fetchActivity}
							setPrisonID={setPrisonID}
							setPrison={setPrison}
							saveEdit={saveEdit}
							setEditing={setEditing}
							setPrisonerToEdit={setPrisonerToEdit}
							editing={editing}
							prisonerToEdit={prisonerToEdit}
							editPrisoner={editPrisoner}
							isAdmin={isAdmin}
							setIsAdmin={setIsAdmin}
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
						/>
					</PrivateRoute>
					<Route path="/createpprofile">
						<CreatePrisonerProfile
							prisonid={prisonid}
							prisonList={prisonList}
							finalList={finalList}
							formattedlist={formattedlist}
							setFormattedList={setFormattedList}
							fetchActivity={fetchActivity}
							setPrisonID={setPrisonID}
							setPrison={setPrison}
							prison={prison}
							name={name}
							setName={setName}
							canLeave={canLeave}
							setCanLeave={setCanLeave}
							skillDescription={skillDescription}
							setSkillDescription={setSkillDescription}
							isAdmin={isAdmin}
							setIsAdmin={setIsAdmin}
							isLoggedIn={isLoggedIn}
						/>
					</Route>

					<Route
						path="/login"
						component={LoginPage}//---<
						getPrisonList={getPrisonList}
						fetchActivity={fetchActivity}
						isAdmin={isAdmin}
						isAdminReducer={isAdminReducer}
						setIsAdmin={setIsAdmin}
						isLoggedIn={isLoggedIn}
						setIsLoggedIn={setIsLoggedIn}
					/>
					<Route path="/">
						<Redirect to="/prisonList" />
					</Route>
					<Route
						component={Login}
						getPrisonList={getPrisonList}
						fetchActivity={fetchActivity}
						setIsAdmin={setIsAdmin}
						isAdmin={isAdmin}
						isLoggedIn={isLoggedIn}
					/>
				</Switch>
			</div>
		</Router>
	);
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

export default connect(mapStateToProps, { fetchActivity, isAdminReducer })(App);
