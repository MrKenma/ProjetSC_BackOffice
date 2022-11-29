import React from 'react';
import AddImg from '../images/addImg.jpg';

function AddButton() {
    return (
        <div className="w-full mt-12">
            <img className="w-2/3 mx-auto mt-2" src={AddImg} alt="Ajouter"/>
        </div>
    );
}

export default AddButton;