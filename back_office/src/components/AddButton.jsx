import React from 'react';
import AddImg from '../images/addImg.png';
import {Link} from 'react-router-dom';

function AddButton(props) {
    return (
        <div className="w-full mt-12">
            <div className="avatar">
                <div className="w-36 rounded-full">
                    <Link to={props.path}><img src={AddImg} alt="Add"/></Link>
                </div>
            </div>
        </div>
    );
}

export default AddButton;