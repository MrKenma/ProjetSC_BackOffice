import React from 'react';
import {Link, NavLink} from 'react-router-dom';

function NavigationBar() {
    return (
        <div className="NavigationBar">
            <div className="bg-info">
                <p className="text-white text-4xl pb-1">BeSafe</p>
            </div>
            <div className="navbar bg-neutral">
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
                        <li><Link className="btn" to="/register">Register</Link></li>
                        <li><NavLink className="btn" to="/login">Log in</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;
