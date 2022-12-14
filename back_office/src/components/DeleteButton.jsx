import React from 'react';
import {Link} from "react-router-dom";

function deleteButton(props) {
    return (
        <div>
            <label htmlFor="my-modal" className="btn btn-error w-full max-w-xs mt-4">Delete</label>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete this organizer ?</h3>
                    <p className="py-4">This organization still has <span className="text-red-600">3</span> events incoming</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn">Cancel</label>
                        <Link to={props.path}>
                            <label htmlFor="my-modal" className="btn btn-error" onClick={() => props.deleteObject(props.id)}>Delete</label>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default deleteButton;