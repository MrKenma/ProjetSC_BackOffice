import React from 'react';

function deleteButton(props) {
    return (
        <div className="join-item mx-4">
            <label htmlFor="my-modal" className="btn btn-error">Delete</label>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete this {props.name} ?</h3>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn">Cancel</label>
                        <label htmlFor="my-modal" className="btn btn-error" onClick={() => props.deleteObject()}>Delete</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default deleteButton;