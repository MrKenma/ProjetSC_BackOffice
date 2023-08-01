import React from 'react';
import {Link, NavLink} from 'react-router-dom';

function NavigationBar() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div className="NavigationBar">
            <div className="bg-info">
                <p className="text-white text-4xl pb-1">BeSafe</p>
            </div>
            <div className="navbar bg-neutral text-white">
                <div className="navbar-start">
                    <ul className="menu menu-horizontal p-0">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/organizations">Organizations</Link></li>
                        <li><Link to="/events">Events</Link></li>
                        <li><Link to="/partiers">Partiers</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <ul className="menu menu-horizontal">
                        {(localStorage.getItem("token") === null && (
                            <>
                                <li><Link to="/register" className="nav-link">Register</Link></li>
                                <li><NavLink className="btn" to="/login">Log in</NavLink></li>
                            </>
                        )) || (
                            <>
                                <li><Link to="/profile" className="nav-link">Profile</Link></li>
                                <li><button type="button" className="btn" onClick={handleLogout}>Log out</button></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;
