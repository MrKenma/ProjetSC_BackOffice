import React from 'react';
import {Link, NavLink} from 'react-router-dom';

function NavigationBar() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");
        window.location.reload();
    }

    return (
        <div className="NavigationBar">
            <div className="bg-info">
                <p className="text-white text-4xl pb-1">BeSafe</p>
            </div>
            <div className="navbar bg-neutral text-white">
                <div className="navbar-start">
                    <ul className="menu menu-horizontal py-0">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/organizations">Organizations</Link></li>
                        <li><Link to="/events">Events</Link></li>
                        <li><Link to="/partiers">Partiers</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {(localStorage.getItem("token") === null && (
                        <>
                            <NavLink className="btn" to="/login">Log in</NavLink>
                        </>
                    )) || (
                        <>
                            <ul className="menu">
                                <li><Link to="/profile" className="nav-link">Profile</Link></li>
                            </ul>
                            <button type="button" className="btn" onClick={handleLogout}>Log out</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;
