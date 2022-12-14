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
                        <td>{organization.email}</td>
                        <td>{organization.name}</td>
                        <td>{organization.responsiblename}</td>
                        <td className="flex">
                            <InfosButton path={`/organizationInfos/${organization.id}`} />
                            <ModifyButton path={`/organizationForm/${organization.id}`} />
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}

export default OrganizationsTab;