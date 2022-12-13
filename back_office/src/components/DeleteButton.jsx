import React from 'react';
import {deleteOrganization} from "./API";
import {Link} from "react-router-dom";

function DeleteButton(props) {


    return (
        <Link to="/organizations">
            <button className="btn btn-error w-full max-w-xs mt-4" onClick={() => deleteOrganization(props.id)}>Delete</button>
        </Link>
    );
}

export default DeleteButton;