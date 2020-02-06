import React, { Component } from 'react';
import axios from "axios";
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
// import { signInWithGoogle } from '../../firebase/firebase.utils';
import "./sign-in.scss";

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        // this.setState({ username: "", password: "" })
        axios
            .post('https://prison-skills.herokuapp.com/api/auth/login', { username: this.state.username, password: this.state.password })
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token);
                this.props.history.push('/prisonList');
                // this.props.getPrisonList();
                // this.props.fetchActivity();
            })
            .catch(err => console.log(err));
    };
    

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ ...this.state, [event.target.name]: value });
    }

    render() {
        return(
            <div className="log-in">
                <h2>I already have an account</h2>
                <span>Log in with Username and Password.</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name="username" 
                    type="username" 
                    value={this.state.username}
                    handleChange={this.handleChange}
                    label="Username"
                    required />

                    <FormInput 
                    name="password" 
                    type="password" 
                    value={this.state.password}
                    handleChange={this.handleChange}
                    label="Password"
                    required />

                    <div className="buttons">
                        <CustomButton type="submit">SIGN IN</CustomButton>
                        {/* <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {''}
                            Sign in with Google{''}
                        </CustomButton> */}
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;