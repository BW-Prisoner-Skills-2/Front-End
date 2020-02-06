import React, { Component } from 'react';
import FormInput from '../form-input/FormInput';
import CustomButton from "../custom-button/CustomButton";
import "./sign-up.scss";
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import axios from "axios";


class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            // email: "",
            // prison: "",
            // role: "",
            password: ""
            // confirmPassword: ""
        }
    }
//merge
    handleSubmit = async event => {
        event.preventDefault();
        console.log(this.state);

        axios
            .post('https://prison-skills.herokuapp.com/api/auth/register', { username: this.state.username, password: this.state.password })
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token);
                this.props.history.push('/prisonList');
                // this.props.getPrisonList();
                // this.props.fetchActivity();
            })
            .catch(err => console.log(err));
    };

    //     const { username, password } = this.state;

    //     if(password !== password) {
    //         alert("passwords dont't match");
    //         return;
    //     }

    //     try {
    //        const { user } = await auth.createUserWithUsernameAndPassword(username, password);

    //        await createUserProfileDocument(user, { username });
           
    //        this.setState({
    //         username: "",
    //         email: "",
    //         prison: "",
    //         role: "",
    //         password: "",
    //         confirmPassword: ""
    //        });       
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    handleChange = event => {
        const { username, value } = event.target;

        this.setState({ ...this.state, [event.target.name]: value });
    }

    render() {
        const {username, password} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with a username and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="username"
                        onChange={this.handleChange}
                        label="Username"
                        required
                    />
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

export default SignUp;