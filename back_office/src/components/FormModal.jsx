import React from 'react';

function FormModal(props) {
    return (
        <div>
            <input type="checkbox" id="submitModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{props.modalMessage}</h3>
                    <div className="modal-action">
                        <label htmlFor="submitModal" className="btn">Ok</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormModal;