import React, { Component } from 'react';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import './sign-up.scss';
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import axios from 'axios';
import { fetchActivity } from '../../actions';
import { connect } from 'react-redux';

class SignUp extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			password: ''
		};
	}
	//merge
	handleSubmit = async (event) => {
		event.preventDefault();
		console.log(this.state);

		axios
			.post('https://prison-skills.herokuapp.com/api/auth/register', {
				username: this.state.username,
				password: this.state.password
			})
			.then((res) => {
				console.log(res);
				localStorage.setItem('token', res.data.token);
				this.props.fetchActivity();
				this.props.history.push('/prisonList');
				// this.props.getPrisonList();
			})
			.catch((err) => console.log(err));
	};

	handleChange = (event) => {
		const { username, value } = event.target;

		this.setState({ ...this.state, [event.target.name]: value });
	};

	render() {
		const { username, password } = this.state;
		return (
			<div className="sign-up">
				<h2 className="title">I do not have an account</h2>
				<span>Sign up with a username and password</span>
				<form className="sign-up-form" onSubmit={this.handleSubmit}>
					<FormInput type="text" name="username" onChange={this.handleChange} label="Username" required />
					{/* <FormInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label="Email"
                        required
                    /> */}
					<FormInput
						type="password"
						name="password"
						value={password}
						onChange={this.handleChange}
						label="Password"
						required
					/>
					{/* <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label="Confirm Password"
                        required
                    /> */}
					<CustomButton type="submit">SIGN UP</CustomButton>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, { fetchActivity })(SignUp);
