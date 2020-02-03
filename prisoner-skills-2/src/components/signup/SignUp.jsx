import React, { Component } from 'react';
import FormInput from '../form-input/FormInput';
import CustomButton from "../custom-button/CustomButton";
import "./sign-up.scss";
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';


class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            prison: "",
            role: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        // const { name, email, prison, role, password, confirmPassword } = this.state;

        // if(password !== confirmPassword) {
        //     alert("passwords dont't match");
        //     return;
        // }

        // try {
        //    const { user } = await auth.createUserWithEmailAndPassword(email, password);

        //    await createUserProfileDocument(user, { name, prison, role });
           
        //    this.setState({
        //     displayName: "",
        //     email: "",
        //     prison: "",
        //     role: "",
        //     password: "",
        //     confirmPassword: ""
        //    });       
        // } catch (error) {
        //     console.log(error);
        // }
    };

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        const {name, email, prison, role, password, confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        label="Name"
                        required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput
                        type="text"
                        name="prison"
                        value={prison}
                        onChange={this.handleChange}
                        label="Prison"
                        required
                    />
                    <FormInput
                        type="text"
                        name="role"
                        value={role}
                        onChange={this.handleChange}
                        label="Role"
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label="Confirm Password"
                        required
                    />
                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;