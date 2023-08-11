import React from 'react';
import OrganizationsTab from "../components/OrganizationsTab";
import {getOrganizations} from "../components/API";
import AddButton from "../components/AddButton";
import FilterBox from "../components/FilterBox";
import {Navigate} from "react-router-dom";

class Organizations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            organizationsToShow: [],
            loading: true,
            error: false,
            errorMessage: ""
        };
    }

    componentDidMount() {
        this.searchOrganizations();
    }

    searchOrganizations() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const organizations = await getOrganizations();
                this.setState({
                    loaded: true,
                    loading: false,
                    organizations: organizations,
                    organizationsToShow: organizations
                });
            } catch (error) {
                this.setState({
                    error: true,
                    loading: false,
                    loaded: true,
                    errorMessage: error.message
                });
            }
        });
    }

    changeValuesToShow (string) {
        const organizationsToShow = this.state.organizations;
        const afterFiltering = organizationsToShow.filter(org => {
            return org.responsiblename.includes(string);
        });

        this.setState({organizationsToShow: afterFiltering});
    }

    render() {
        let Content;

        if (this.state.loading) {
            Content = <p>Chargement en cours</p>
        } else if (this.state.error) {
            Content = <p>{this.state.errorMessage}</p>
        } else if (this.state.organizations[0]) {
            Content = <OrganizationsTab
                organizations={this.state.organizationsToShow}
            />
        }

        if (!localStorage.getItem("isAdmin")) {
            return (
                <Navigate to="/" />
            );
        } else {
            return (
                <div className="flex">
                    <div className="flex-none w-56 bg-neutral">
                        <AddButton path="/organizationForm/0" />
                        <FilterBox placeholder="Filter by responsible name" callback={(searchValue) => this.changeValuesToShow(searchValue)} />
                    </div>
                    <div className="flex-auto overflow-x-auto">
                        {Content}
                    </div>
                </div>
            );
        }
    }
}

export default Organizations;