import React from 'react';
import {Link} from "react-router-dom";

function FormModal(props) {
    return (
        <div>
            <input type="checkbox" id="submitModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{props.modalMessage}</h3>
                    <div className="modal-action">
                        <label htmlFor="submitModal" className="btn" onClick={() => window.location.reload()}>Continue</label>
                        <Link to={`${props.path}`}><label htmlFor="submitModal" className="btn">Leave</label></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormModal;