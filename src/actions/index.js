import axios from 'axios';

export const FETCHING_ACTIVITY_START = 'FETCHING_ACTIVITY_START';
export const FETCHING_ACTIVITY_SUCCESS = 'FETCHING_ACTIVITY_SUCCESS';
export const FETCHING_ACTIVITY_FAILURE = 'FETCHING_ACTIVITY_FAILURE';
export const FETCHING_PRISONERS_START = 'FETCHING_PRISONERS_START';
export const FETCHING_PRISONERS_SUCCESS = 'FETCHING_PRISONERS_SUCCESS';
export const FETCHING_PRISONERS_FAILURE = 'FETCHING_PRISONERS_FAILURE';
export const FETCHING_LOCATIONS_START = 'FETCHING_LOCATIONS_START';
export const FETCHING_LOCATIONS_SUCCESS = 'FETCHING_LOCATIONS_SUCCESS';
export const FETCHING_LOCATIONS_FAILURE = 'FETCHING_LOCATIONS_FAILURE';
export const FINAL_LIST_SUCCESS = 'FINAL_LIST_SUCCESS';
export const FORMATTED_LIST = 'FORMATTED_LIST';
export const IS_ADMIN = 'IS_ADMIN';

export const isAdminReducer = isAdmin => dispatch => {
	if (isAdmin === true) {
		dispatch({
			type: IS_ADMIN,
			payload: false
		});
	} else {
		dispatch({
			type: IS_ADMIN,
			payload: true
		});
	}
};

export const fetchActivity = props => dispatch => {
	dispatch({ type: FETCHING_ACTIVITY_START });
	let currentPrisonList;
	let currentPrisonerList;
	axios
		.get(`https://prison-skills.herokuapp.com/api/prisons`)
		.then(response => {
			dispatch({ type: FETCHING_ACTIVITY_SUCCESS, payload: response.data });
			currentPrisonList = response.data;
			let y = 0;
			for (let x = 0; x < currentPrisonList.length; x++) {
				y = x + 1;
				axios
					.get(`https://prison-skills.herokuapp.com/api/prisons/${y}/prisoners`)
					.then(res => {
						currentPrisonerList = res.data;
						axios
							.get(`http://api.zippopotam.us/us/${currentPrisonList[x].zipcode}`)
							.then(resp => {
								dispatch({
									type: FINAL_LIST_SUCCESS,
									payload: [
										[currentPrisonList[x]],
										res.data,
										[resp.data.places[x]['place name'], resp.data.places[x].state]
									]
								});
							})
							.catch(error => {
								dispatch({
									type: FINAL_LIST_SUCCESS,
									payload: [[currentPrisonList[x]], res.data, ['none', 'none']]
								});
							});
						dispatch({
							type: FORMATTED_LIST,
							payload: props.finalList
						});
					})
					.catch(error => {
						dispatch({ type: FETCHING_PRISONERS_FAILURE, payload: error.response });
					});
			}
		})
		.catch(error => {
			dispatch({ type: FETCHING_ACTIVITY_FAILURE, payload: error.response });
		});
};

export const fetchLocations = prisonList => dispatch => {
	dispatch({ type: FETCHING_LOCATIONS_START });
	for (let x = 0; x < prisonList.length; x++) {
		axios
			.get(`http://api.zippopotam.us/us/${prisonList.zipcode}`)
			.then(response => {
				dispatch({ type: FETCHING_LOCATIONS_SUCCESS, payload: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	}
	finalListMaker();
};

export const fetchPrisoners = prisonList => dispatch => {
	dispatch({ type: FETCHING_PRISONERS_START });
	for (let x = 0; x < prisonList.length; x++) {
		axios
			.get(`https://prison-skills.herokuapp.com/api/prisons/${x}/prisoners`)
			.then(response => {
				dispatch({ type: FETCHING_PRISONERS_SUCCESS, payload: response.data });
			})
			.catch(error => {
				console.log(error.response);
				dispatch({ type: FETCHING_PRISONERS_FAILURE, payload: error.response });
			});
		dispatch({ type: FETCHING_LOCATIONS_START });
		for (let x = 0; x < prisonList.length; x++) {
			axios
				.get(`http://api.zippopotam.us/us/${prisonList[x].zipcode}`)
				.then(response => {
					dispatch({ type: FETCHING_LOCATIONS_SUCCESS, payload: response.data });
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
};

export const finalListMaker = props => dispatch => {
	axios
		.get(`https://prison-skills.herokuapp.com/api/prisons`)
		.then(response => {
			for (let x = 0; x < response.data.length; x++) {
				dispatch({
					type: FINAL_LIST_SUCCESS,
					payload: [response.data[x], props.allPrisonerList[x], props.allPrisonLocations[x]]
				});
			}
		})
		.catch(error => {
			console.log(error.response);
		});
};
