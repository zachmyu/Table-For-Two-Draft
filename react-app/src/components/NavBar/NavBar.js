import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import DemoUser from '../auth/DemoUser'
import LoginFormModal from '../auth/LoginForm';
import SignUpFormModal from '../auth/SignUpForm';

import "./NavBar.css"


const NavBar = ({ loaded }) => {
    const user = useSelector(state => state.session.user);

    let sessionLinks;
    if (user) {
        sessionLinks = (
            <div className='navbar-buttons-group'>
                <div className='navbar-button'>
                    <NavLink to={`/users/${user.id}`} exact={true} activeClassName='active' className='navbar-button'>
                        <i className="fas fa-user-circle"></i>
                    </NavLink>
                </div>
                <div className='navbar-button'>
                    <i className="far fa-calendar"></i>
                </div>
                <div className='navbar-button-container'>
                    <LogoutButton />
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <div className='navbar-buttons-group'>
                <div className='navbar-button-container'>
                    <LoginFormModal />
                </div>
                <div className='navbar-button-container'>
                    <SignUpFormModal />
                </div>
                <div className='navbar-button-container'>
                    <DemoUser />
                </div>
            </div>
        );
    }

    return (
        <div className='navbar__container'>
            <NavLink className='navbar__logo' exact to="/">
                <img src="/images/logo.png" className="homepageLogo" alt="homepageLogo"></img>
            </NavLink>
            <div className='session-container' >
                {loaded && sessionLinks}
            </div>
        </div>
    );
}

export default NavBar;
