import React from 'react';
import AddImg from '../images/filter.jpg'

function FilterButton() {
    return (
        <div className="w-full mt-12" onClick="">
            <img className="w-5/6 mx-auto mt-2" src={AddImg} alt="Filter"/>
        </div>
    );
}

export default FilterButton;