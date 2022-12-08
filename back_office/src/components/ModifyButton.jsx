import React from 'react';
import {Link} from 'react-router-dom';
import ModifyIcon from "../images/modifyIcon.png";

function InfosButton() {
    return (
        <div className="avatar">
            <div className="w-10 rounded-full">
                <Link to="/organizationForm"><img src={ModifyIcon} alt="modify" /></Link>
            </div>
        </div>
    );
}

export default InfosButton;