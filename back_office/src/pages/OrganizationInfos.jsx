import React from 'react';
import {useParams} from 'react-router-dom';
import {getOrganization} from "../components/API";
import DeleteButton from "../components/DeleteButton";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class OrganizationInfos extends React.Component {

    constructor(props) {
        super(props);
        const id = parseInt(this.props.params.id);

        this.state = {
            id: id,
            organization: {},
            loading: true,
            error: false,
            errorMessage: ""
        }
    }

    componentDidMount() {
        this.searchOrganization();
    }

    searchOrganization() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const organization = await getOrganization(this.state.id);
                this.setState({
                    loaded: true,
                    loading: false,
                    organization: organization
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

    render() {
        let Content;

        if (this.state.loading) {
            Content = <p>Chargement en cours</p>
        } else if (this.state.error) {
            Content = <p>{this.state.errorMessage}</p>
        } else if (this.state.organization) {
            Content = (
                <div className="pb-4">
                    <div>Organization's name : {this.state.organization.name}</div>
                    <div>Email address : {this.state.organization.emailaddress}</div>
                    <div>Reference phone number : {this.state.organization.referencephonenumber}</div>
                    <div>Responsible name : {this.state.organization.responsiblename}</div>
                    <div>Administrative proof : {this.state.organization.administrativeproof}</div>
                    <DeleteButton id={this.state.id} />
                </div>
            );
        }

        return (
            <div className="bg-base-200 max-w-4xl mx-auto mt-2 rounded">
                <div className="text-2xl mb-4 bg-neutral pb-1 rounded-t">Organization Informations</div>
                {Content}
            </div>
        );
    }
}

export default withParams(OrganizationInfos);