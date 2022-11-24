import React from 'react';
import AddButton from "./AddButton";

function Organizations() {
    return (
        <div className="flex">
            <div className="flex-none w-28 bg-base-content">
                <AddButton />
            </div>
            <div className="flex-auto overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Responsible</th>
                            <th>Number of events organized</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>AGL</td>
                            <td>Marine Jacquelot</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Maison des jeunes</td>
                            <td>Thomas Meunier</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Cercle IESN</td>
                            <td>Hannah Priem</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Organizations;