import React, { useState, useEffect } from 'react'
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from "./LoggedOutNav";
import "../../App.css"
import { NavLink } from "react-router-dom"
const Navigation = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false)


    const updateDropdown = (bool) => {
        setDropdownOpen(bool)
    }

    const updateParent = (val) => {
        props.updateApp(val)
    }

    const updateReg = (val) => {
        props.updateReg(val)
    }

    const logout = () => {
        props.logout()
    }
    
    return (
        <nav className="nav">
            <ul className="consistentNav">
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/crazy">Crazy 8s</NavLink>
                </li>
            </ul>
            {
                props.user.isLoggedIn ? (
                    <LoggedInNav 
                        isLoggedIn={props.isLoggedIn}
                        logout={logout}
                        toggleMenu={updateDropdown}
                        dropdownOpen={dropdownOpen}
                        user={props.user}
                    />
                )
                : (
                    <LoggedOutNav
                        updateParent={updateParent}
                        updateRegister={updateReg}
                        registerOpen={props.registerOpen}
                        loginOpen={props.loginOpen}
                    />
                )
            }
        </nav>
    );
}

export default Navigation