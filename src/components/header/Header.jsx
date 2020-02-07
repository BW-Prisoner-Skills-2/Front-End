import React from 'react'
import { Link } from 'react-router-dom';
import "./header.scss";
import logo from "../../img/logo.png";
// import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => {
   return (
    <div className="header">
        <Link className="logo-container" to="/">
            <img src={logo} className="App-logo" alt="logo" />
        </Link> 
        <div className="options">
            <Link className="option" to="/login">
                SIGN UP
            </Link>

            {
                currentUser ? (
                    <div className="option" >SIGN OUT</div>
                    ) : (
                        <Link className="option" to="login">SIGN IN</Link>
                )
            }
        </div>
    </div>
   );
};

export default Header;