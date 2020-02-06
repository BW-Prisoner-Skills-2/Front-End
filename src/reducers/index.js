import {
	FETCHING_ACTIVITY_START,
	FETCHING_ACTIVITY_SUCCESS,
	FETCHING_ACTIVITY_FAILURE,
	FETCHING_PRISONERS_START,
	FETCHING_PRISONERS_SUCCESS,
	FETCHING_PRISONERS_FAILURE,
	FETCHING_LOCATIONS_START,
	FETCHING_LOCATIONS_SUCCESS,
	FETCHING_LOCATIONS_FAILURE,
	FORMATTED_LIST,
	IS_ADMIN,
	FINAL_LIST_SUCCESS
} from '../actions';

const initialState = {
	allPrisonerList: [],
	allPrisonLocations: [],
	prisonerList: [],
	prisonList: [],
	prisonid: '',
	prison: '',
	error: '',
	finalList: [],
	formattedlist: [],
	isAdmin: false,
	isLoading: false
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case IS_ADMIN:
			if (action.payload === false) {
				return {
					...state,
					isAdmin: true
				};
			} else {
				return {
					...state,
					isAdmin: false
				};
			}

		case FETCHING_ACTIVITY_START:
			return {
				...state,
				isLoading: true
			};
		case FETCHING_ACTIVITY_SUCCESS:
			return {
				...state,
				prisonList: action.payload
			};
		case FETCHING_PRISONERS_START:
			return {
				...state,
				isLoading: true
			};
		case FETCHING_PRISONERS_SUCCESS:
			return {
				...state,
				prisonerList: action.payload,
				allPrisonerList: [...state.allPrisonerList, action.payload]
			};
		case FETCHING_LOCATIONS_START:
			return {
				...state,
				isLoading: true
			};
		case FETCHING_LOCATIONS_SUCCESS:
			return {
				...state,
				allPrisonLocations: [...state.allPrisonLocations, action.payload]
			};
		case FINAL_LIST_SUCCESS:
			return {
				...state,
				finalList: [...state.finalList, action.payload],
				formattedlist: [...state.finalList, action.payload].filter(function onlyUnique(value, index, self) {
					return self.indexOf(value) === index;
				})
			};
		case FORMATTED_LIST:
			return {
				...state,
				formattedlist: [...state.finalList, action.payload].filter(function onlyUnique(value, index, self) {
					return self.indexOf(value) === index;
				})
			};

		default:
			return state;
	}
};
