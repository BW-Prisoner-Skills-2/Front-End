import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchActivity, isAdminReducer } from '../actions';
import { connect } from 'react-redux';
import SearchForm from './SearchForm';
import Header from './Header';
import Footer from './Footer';

const Div = styled.div`
	background-color: #006e90;
	width: 95%;
	margin: 2%;
	padding: 1%;
	color: #c0c0c0;
	padding-top: 3%;
	padding-bottom: 3%;
	font-family: 'Roboto', sans-serif;
`;
const inline = {
	color: '#c0c0c0',
	paddingTop: '2%',
	paddingBottom: '2%'
};
const listPadding = {
	paddingTop: '0%'
};
const headerPadding = {
	paddingTop: '-3%',
	height: '0%'
};
const Prison = styled.div`
	background-color: #006e90;
	width: 65%;
	margin: 3% 3% 3% 16%;
	padding: 1%;
	color: white;
	font-family: 'Roboto', sans-serif;
	box-shadow: 5px 5px 14px -8px #000000;
	&:hover {
		border: 3px solid #c0c0c0;
		color: #000000;
	}
`;

const Hr = styled.hr`
	border-top: 3px solid #99c24d;
	background: transparent;
`;
let IndividualPrisonListItem = props => {
	const handleClick = prison => {
		{
			prison !== 'undefined' &&
				prison !== 'null' &&
				prison !== '' &&
				console.log('prison = ' + JSON.stringify(prison));

			props.setPrison(prison);
			props.setPrisonID(prison[0][0]['id']);
		}
	};

	useEffect(() => {
		props.fetchActivity();
	}, []);
	//, []
	return (
		<Div>
			<div>
				<Header />
				<SearchForm
					prisonList={props.prisonList}
					formattedlist={props.formattedlist}
					prisonid={props.prisonid}
					setPrisonID={props.setPrisonID}
					setPrison={props.setPrison}
					setFormattedList={props.setFormattedList}
					isAdmin={props.isAdmin}
					setIsAdmin={props.setIsAdmin}
				/>
				<Hr />
				<h2 id="fullPrisonListHeader" style={headerPadding}>
					Click a Prison to View Available Workers:
				</h2>
			</div>
			<div id="fullFormattedList" style={listPadding}>
				{props.formattedlist &&
					Array.from(new Set(props.formattedlist.map(a => a[0][0]['name'])))
						.map(name => {
							return props.formattedlist.find(a => a[0][0]['name'] === name);
						})
						.map(prison => (
							<Prison>
								<Link
									to={`/prisons/${prison[0][0]['id']}`}
									key={`${prison[0][0]['id']}`}
									prisonid={prison[0][0]['id']}
									formattedlist={props.formattedlist}
									style={inline}
									prison={prison}
									prisonid={props.prisonid}
									onClick={() => {
										props.setPrison(prison);
										handleClick(prison);
									}}
								>
									<div>{prison[0][0]['name']}</div>
									<div>
										{prison[2][0]}, {prison[2][1]}
									</div>
									<div>
										Prisoners Available for Work: {prison[0][0]['population'][0]['prisoners']}
									</div>
								</Link>
							</Prison>
						))}
			</div>
			<Footer />
		</Div>
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

export default connect(mapStateToProps, { fetchActivity, isAdminReducer })(IndividualPrisonListItem);
