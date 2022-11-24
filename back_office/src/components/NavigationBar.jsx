import React from 'react';

function NavigationBar() {
    return (
        <div className="NavigationBar">
            <div className="bg-info">
                <p className="text-white text-4xl pb-1">BeSafe</p>
            </div>
            <div className="navbar bg-neutral">
                <div className="navbar-start">
                    <ul className="menu menu-horizontal p-0">
                        <li><a>Home</a></li>
                        <li><a>Organizations</a></li>
                        <li><a>Events</a></li>
                        <li><a>Users</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Log in</a>
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;