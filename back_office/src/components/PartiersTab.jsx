import React from 'react';
import ModifyButton from "./ModifyButton";

const PartiersTab = (props) => {
    const partiers = props.partiers;

    return (
        <table className="table w-full">
            <thead>
            <tr>
                <th>Profile picture</th>
                <th>Name</th>
                <th>Nickname</th>
                <th>Email address</th>
                <th>Town</th>
                <th>Modify</th>
            </tr>
            </thead>
            <tbody>
            {partiers.map(partier => {
                return (
                    <tr key={partier.userid}>
                        <td>
                            <div className="avatar">
                                <div className="rounded-full w-10">
                                    <img alt="Profile" src={partier.profilePictureUri} />
                                </div>
                            </div>
                        </td>
                        <td>{partier.firstname + " " + partier.lastname}</td>
                        <td>{partier.user.pseudo}</td>
                        <td>{partier.user.email}</td>
                        <td>{partier.addresstown}</td>
                        <td className="flex">
                            <ModifyButton path={`/partierForm/${partier.userid}`} />
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}

export default PartiersTab;
