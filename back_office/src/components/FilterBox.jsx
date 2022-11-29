import React from 'react';
import {getOrganizationsResponsibles} from "./API";
import OrganizationPanel from "./Organization";

class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responsibles: [],
            loading: true,
            error: false,
            errorMessage: ""
        };
    }

    componentDidMount() {
        this.searchNames();
    }

    searchNames() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const responsibles = await getOrganizationsResponsibles();
                this.setState({
                    loaded: true,
                    loading: false,
                    responsibles: responsibles
                });
            } catch (error) {
                this.setState({
                    error: true,
                    loading: false,
                    loaded: true,
                    errorMessage: error.message
                })
            }
        });
    }

    render() {
        let Content;

        if (this.state.loading === true) {
            Content = <p>Chargement en cours</p>
        } else if (this.state.error) {
            Content = <p>{this.state.errorMessage}</p>
        } else if (this.state.responsibles[0]) {
            console.log(this.state.responsibles);
            Content = (
                <div className="w-full mt-12 mb-12">
                    <select className="select w-2/3 max-w-xs">
                        <option disabled selected>Filter by responsible name</option>
                        {this.state.responsibles.map(responsible => {
                            return (
                                <option>{responsible.responsiblename}</option>
                            );
                        })}
                    </select>
                    <button className="btn btn-primary mt-2">Filter</button>
                </div>
            );
        }

        return (
            <>
                {Content}
            </>
        );
    }
}

export default FilterBox;