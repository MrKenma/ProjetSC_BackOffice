import React from 'react';
import OrganizationPanel from "../components/Organization";
import {getOrganizations} from "../components/API";

class Organization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
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
                    loading: false
                });
                for (let organization of organizations) {
                    this.state.organizations.push(organization)
                }
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
        } else if (this.state.organizations[0].emailaddress) {
            console.log(this.state.organizations);
            Content = <OrganizationPanel
                organizations={this.state.organizations}
            />
        }
        return (
            <>
                {Content}
            </>
        );
    }
}

export default Organization;