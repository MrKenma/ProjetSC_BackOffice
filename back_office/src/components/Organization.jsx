import React from 'react';
import AddButton from "./AddButton";
import {getOrganizations} from "./API";

class Organization extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.state.organizations = [
            {name: "AGL", responsible: "Marine Jacquelot", numberOfEvents: 4},
            {name: "Maison des jeunes", responsible: "Thomas Meunier", numberOfEvents: 2},
            {name: "Cercle IESN", responsible: "Hannah Priem", numberOfEvents: 0}
        ];
    }

    componentDidMount() {
        this.searchOrganizations();
    }

    searchOrganizations() {
        const res = getOrganizations();
    }

    render() {
        return (
            <div className="flex">
                <div className="flex-none w-28 bg-base-content">
                    <AddButton />
                </div>
                <div className="flex-auto overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Responsible</th>
                            <th>Number of events organized</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.organizations.map(organization => {
                            return (
                                <tr key={organization.name}>
                                    <td>{organization.name}</td>
                                    <td>{organization.responsible}</td>
                                    <td>{organization.numberOfEvents}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Organization;