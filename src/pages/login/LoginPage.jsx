import React from "react";
import SignUp from "../../components/signup/SignUp";
import SignIn from "../../components/signin/SignIn";
import "./loginpage.scss";
import Header from "../../components/header/Header";

const LoginPage = () => (
    <div className="signuporsignin">
        <Header />
         <div className="login-page">
         <SignUp />
         <SignIn />
         </div>

    </div>
);

export default LoginPage;