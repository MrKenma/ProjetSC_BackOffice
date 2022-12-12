import React from 'react';
import InfosButton from "./InfosButton";
import ModifyButton from "./ModifyButton";

const OrganizationsTab = (props) => {
    const organizations = props.organizations;

    return (
        <table className="table w-full">
            <thead>
            <tr>
                <th>Email Address</th>
                <th>Name</th>
                <th>Responsible</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {organizations.map(organization => {
                return (
                    <tr key={organization.id}>
                        <td>{organization.emailaddress}</td>
                        <td>{organization.name}</td>
                        <td>{organization.responsiblename}</td>
                        <td className="flex">
                            <InfosButton id={organization.id} />
                            <ModifyButton id={organization.id} />
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}

export default OrganizationsTab;