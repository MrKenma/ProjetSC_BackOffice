import React from 'react';
import AddButton from "../components/AddButton";

const Organization = (props) => {
    const organizations = props.organizations;

    return (
        <div className="flex">
            <div className="flex-none w-28 bg-base-content">
                <AddButton />
            </div>
            <div className="flex-auto overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Email Address</th>
                        <th>Name</th>
                        <th>Responsible</th>
                    </tr>
                    </thead>
                    <tbody>
                    {organizations.map(organization => {
                        return (
                            <tr key={organization.emailaddress}>
                                <td>{organization.emailaddress}</td>
                                <td>{organization.name}</td>
                                <td>{organization.responsiblename}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Organization;