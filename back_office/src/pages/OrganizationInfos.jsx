import React from 'react';
import {useParams} from 'react-router-dom'

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

    searchOrganization() {
        this.setState({loading: true, error: false}, async () => {
            try {

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
        return (
            <div className="bg-white max-w-4xl mx-auto mt-2 rounded">
                <div className="text-2xl mb-4 bg-neutral pb-1 rounded-t">Organization form</div>
                <div>{this.state.id}</div>
            </div>
        );
    }
}

export default withParams(OrganizationInfos);