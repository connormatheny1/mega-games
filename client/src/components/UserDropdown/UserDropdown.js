/* eslint-disable no-debugger, no-console, no-unused-vars, jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Switch } from "@blueprintjs/core";
import { Link } from "react-router-dom"

const UserDropdown = props => {
    const img = [
        {val: 0, path:require("../../assets/images/0.png")},
        {val: 1, path:require("../../assets/images/1.png")},
        {val: 2, path:require("../../assets/images/2.png")},
        {val: 3, path:require("../../assets/images/3.png")},
        {val: 4, path:require("../../assets/images/4.png")},
        {val: 5, path:require("../../assets/images/5.png")},
        {val: 6, path:require("../../assets/images/6.png")},
        {val: 7, path:require("../../assets/images/7.png")},
        {val: 8, path:require("../../assets/images/8.png")},
    ]

    const logout = () => {
        props.logout()
    }

    return(
        <div onClick={props.onClick} className="userDropdownCont" style={!props.open ? {"border": "none"} : null}>
            <div className="dropdownStatic">
                <span>{props.user.username}</span>
            </div>
            <div className="userAvatar">
                { props.user.avatar >= 0 ? 
                    (<img src={img[props.user.avatar].path} alt="user avatar icon" height={35} width={35}></img>) :
                    (<i className="fas fa-user-circle"></i>)
                }
            </div>
            <ul className="userDropdownList" style={props.open ? {"display": "flex"} : {"display": "none"} }>
                <span>My stuff</span>
                <li>
                    <i className="fas fa-id-card"></i>
                    <Link to="/profile">My Profile</Link>
                </li>
                <li><i className="fa fa-cog"></i><a>User Settings</a></li>
                <span>View Options</span>
                <li>
                    <i className="fas fa-moon"></i>
                    <a>Night Mode</a>
                    <Switch 
                        inline={true}
                    />
                </li>
                <li className="logout" style={{"marginTop":10}}>
                    <i className="fa fa-sign-out"></i>
                    <a onClick={logout}>Log Out</a>
                </li>
            </ul>
        </div>
    )

}

export default UserDropdown;