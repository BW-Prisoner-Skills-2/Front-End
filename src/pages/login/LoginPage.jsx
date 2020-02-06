import React from "react";
import SignUp from "../../components/signup/SignUp";
import SignIn from "../../components/signin/SignIn";
import "./loginpage.scss";

const LoginPage = () => (
    <div className="login-page">
        <SignUp />
        <SignIn />
    </div>
);

export default LoginPage;