import React from 'react';
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
                <th>Verified</th>
                <th>Modify</th>
            </tr>
            </thead>
            <tbody>
            {organizations.map(organization => {
                return (
                    <tr key={organization.userid}>
                        <td>{organization.user.email}</td>
                        <td>{organization.user.pseudo}</td>
                        <td>{organization.responsiblename}</td>
                        <td>{organization.isverified ? "Yes" : "No"}</td>
                        <td className="flex">
                            <ModifyButton path={`/organizationForm/${organization.userid}`} />
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}

export default OrganizationsTab;