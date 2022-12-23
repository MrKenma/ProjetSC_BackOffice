
import React from 'react';
import InfosButton from "./InfosButton";
import ModifyButton from "./ModifyButton";


const PartiersTab = (props) => {
    const partiers = props.partiers;
            return (
                <table className="table w-full">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Login</th>
                    <th>E-Mail</th>
                    <th>Town</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {partiers.map(partier => {
                return (
                    <tr key={partier.id}>
                        <td>{partier.firstname+" "+partier.lastname}</td>
                        <td>{partier.pseudo}</td>
                        <td>{partier.email}</td>
                        <td>{partier.addresstown+" "+partier.addresszipcode}</td>
                        <td className="flex">
                        <InfosButton path={`/partierInfos/${partier.id}`} />
                        <ModifyButton path={`/partierForm/${partier.id}`} />
                        </td>
                    </tr>
                );
            })}
            </tbody>
            </table>
        )
}

export default PartiersTab;
