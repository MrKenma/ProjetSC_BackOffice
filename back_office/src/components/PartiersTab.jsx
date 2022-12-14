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
                <th>E-mail</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {partiers.map(partier => {
                return (
                    <tr key={partier.id}>
                        <td>{partier.firstName}</td>
                        <td>{partier.pseudo}</td>
                        <td>{partier.emailAddress}</td>
                        <td className="flex">
                            <InfosButton id={partier.id} />
                            <ModifyButton />
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}

export default PartiersTab;
