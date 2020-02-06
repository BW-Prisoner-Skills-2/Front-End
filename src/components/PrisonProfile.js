import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fetchActivity, isAdminReducer } from '../actions';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { connect } from 'react-redux';
import Login from './Login';
import Header from './Header';
import Footer from './Footer';

const Div = styled.div`
	background-color: #006e90;
	width: 95%;
	margin: 3%;
	padding: 1%;
	color: #c0c0c0;
	font-family: 'Roboto', sans-serif;
`;
const Prison = styled.div`
	background-color: #006e90;
	width: 65%;
	margin: 3% 3% 3% 16%;
	padding: 1%;
	color: #c0c0c0;
	font-family: 'Roboto', sans-serif;
	box-shadow: 5px 5px 14px -8px #000000;
	&:hover {
		border: 3px solid #c0c0c0;
		color: #000000;
	}
`;

const Input = styled.input`
	margin: 2%;
	padding: 1%;
	background-color: #c0c0c0;
	color: #006e90;
`;
const inline = {
	width: '100%',
	display: 'flex',
	wrap: 'nowrap',
	justifyContent: 'center',
	flexDirection: 'column',
	padding: '0%',
	margin: '0%'
};

const outline = {
	display: 'flex',
	wrap: 'nowrap',
	justifyContent: 'center'
};
const outlineB = {
	display: 'flex',
	wrap: 'wrap',
	flexDirection: 'column',
	justifyContent: 'center',
	border: '3px solid #c0c0c0'
};
const linksColor = {
	color: '#c0c0c0'
};
const buttons = {
	display: 'flex',
	flexDirection: 'row',
	wrap: 'nowrap',
	justifyContent: 'center'
};
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

const editingForm = {
	display: 'flex',
	flexDirection: 'column',
	wrap: 'wrap'
};

const H2 = styled.h2`
	font-family: 'Rubik', sans-serif;
	padding: '0%';
	margin: '0%';
`;
const H3 = styled.h3`
	font-family: 'Rubik', sans-serif;
	padding: '0%';
	margin: '0%';
`;

const H4 = styled.h4`
	font-family: 'Rubik', sans-serif;
	padding: '0%';
	margin: '0%';
`;
const Hr = styled.hr`
	border-top: 3px solid #99c24d;
	background: transparent;
`;
/*
const Rocket = styled.img`
	src: url(${rocket});
	justify-content: right;
	align-self: right;
	width: 10%;
	padding-top: 2%;
	color: #ffffff;
	transform: translate(-2vh, -6vh);
	animation: ${wobble3};
	animation-duration: 1s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	z-index: 99000;
	overflow: hidden;
`;
*/

class PrisonProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}
	deletePrisoner(prisonid, prisonerid) {
		axiosWithAuth()
			.delete(`/prisons/${prisonid}/prisoners/${prisonerid}`)
			.then(res => {
				document.getElementById(`statusmessage${prisonerid}`).style.color = '#c0c0c0';
				document.getElementById(`statusmessage${prisonerid}`).textContent = 'This prisoner has been deleted.';
			})
			.catch(err => {
				console.log(err);
			});
	}

	deleteSkill(prisonid, prisonerid, skillid) {
		axiosWithAuth()
			.delete(`/prisons/${prisonid}/prisoners/${prisonerid}/skills/${skillid}`)
			.then(res => {
				document.getElementById(`statusmessage${skillid}`).style.color = 'c0c0c0';
				document.getElementById(`statusmessage${skillid}`).textContent = 'This skill has been deleted.';
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<Div>
				<Header />
				{localStorage.getItem('token') === false && <Link to="/login" component={Login}></Link>}
				<div style={buttons}>
					<Link to={`/prisonList`} style={linksColor}>
						<Button>back to list of prisons</Button>
					</Link>
				</div>
				{this.props.prison && (
					<div>
						{localStorage.getItem('token') && (
							<div style={buttons}>
								<Link
									to={`/createpprofile`}
									prison={this.props.prison}
									prisonid={this.props.prison[0][0]['id']}
									onClick={this.props.setPrison(this.props.prison)}
									style={linksColor}
								>
									<Button>create a prisoner profile</Button>
								</Link>
							</div>
						)}
						<Hr />
						<H2>{this.props.prison[0][0]['name']}</H2>
						<H3>{this.props.prison[0][0]['address']}</H3>
						<H3>
							{this.props.prison[2][0]}, {this.props.prison[2][1]} {this.props.prison[0][0]['zipcode']}
						</H3>

						{this.props.editing && this.props.prisonerToEdit && (
							<form id="editingForm" onSubmit={this.props.saveEdit} style={editingForm}>
								<div style={editingForm}>
									<div style={editingForm}>
										<legend>edit prisoner</legend>
										<br />
										<label>
											name:
											<Input
												onChange={e => {
													this.props.setPrisonerToEdit({
														...this.props.prisonerToEdit,
														name: e.target.value
													});
													this.props.setPrisonID(this.props.prison[0][0]['id']);
												}}
												value={this.props.prisonerToEdit.name}
												placeholder="enter the prisoner's name"
											/>
										</label>
									</div>
									<div style={editingForm}>
										<label>
											can leave:
											<Input
												onChange={e =>
													this.props.setPrisonerToEdit({
														...this.props.prisonerToEdit,
														can_leave: e.target.value
													})
												}
												value={this.props.prisonerToEdit.can_leave}
												placeholder="yes, no, true, or false"
											/>
										</label>
									</div>
									<div style={editingForm}>
										<label>
											add skill:
											<Input
												onChange={e =>
													this.props.setPrisonerToEdit({
														...this.props.prisonerToEdit,
														description: e.target.value
													})
												}
												value={this.props.prisonerToEdit.description}
												placeholder="add a skill"
											/>
										</label>
									</div>
									<div style={editingForm}>
										<div className="button-row">
											<Button type="submit">save</Button>
											<Button onClick={() => this.props.setEditing(false)}>cancel</Button>
										</div>
									</div>
								</div>
							</form>
						)}

						<Hr />
						<H2>Workers:</H2>
						<div>
							{this.props.prison[1].map(prisoner => (
								<Prison style={outlineB}>
									<div style={outline}>
										<H4 style={inline}>Name:</H4>
										<div style={inline}>{prisoner.name}</div>
									</div>
									<div>
										{' '}
										{prisoner.can_leave === 0 ? (
											<div style={outline}>
												<H4 style={inline}>Can Leave?</H4>
												<div style={inline}>No</div>
											</div>
										) : (
											<div style={outline}>
												<H4 style={inline}>Can Leave?</H4>
												<div style={inline}>Yes</div>
											</div>
										)}
									</div>
									<H4 style={outline}>Skills:</H4>
									{prisoner.skills.map(skill => (
										<div style={inline}>{skill.description}</div>
									))}
									{localStorage.getItem('token') && (
										<div style={outline}>
											{prisoner.skills.map(
												skill =>
													localStorage.getItem('token') === true && (
														<div>
															<Button
																onClick={() => {
																	this.deleteSkill(
																		this.props.prison[0][0]['id'],
																		prisoner.id,
																		skill.id
																	);
																}}
															>
																Delete This Skill
															</Button>
															<div id={'statusmessage' + skill.id} width="100%"></div>
														</div>
													)
											)}
											<div>
												<Button
													onClick={() =>
														this.deletePrisoner(this.props.prison[0][0]['id'], prisoner.id)
													}
												>
													Delete This Prisoner
												</Button>
												<Button
													onClick={() => {
														this.props.editPrisoner(prisoner);
													}}
												>
													Edit This Prisoner
												</Button>
												<div id={'statusmessage' + prisoner.id}></div>
											</div>
										</div>
									)}
								</Prison>
							))}
						</div>
					</div>
				)}
				<Footer />
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

export default connect(mapStateToProps, { fetchActivity, isAdminReducer })(PrisonProfile);
