import React from 'react';
import {Link} from 'react-router-dom';
import InfosIcon from "../images/infosIcon.png";

function InfosButton(props) {
    return (
        <div className="avatar mr-4">
            <div className="w-10 rounded-full">
                <Link to={`/organizationInfos/${props.id}`}><img src={InfosIcon} alt="infos" /></Link>
            </div>
        </div>
    );
}

export default InfosButton;