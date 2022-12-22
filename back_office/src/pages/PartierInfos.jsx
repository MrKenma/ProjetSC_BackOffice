import React from 'react';
import {useParams} from 'react-router-dom';
import {getPartier, deletePartier} from "../components/API";
import DeleteButton from "../components/DeleteButton";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class PartierInfos extends React.Component {

    constructor(props) {
        super(props);
        const id = parseInt(this.props.params.id);

        this.state = {
            id: id,
            partier: {},
            loading: true,
            error: false,
            errorMessage: ""
        }
    }

    componentDidMount() {
        this.searchPartier();
    }

    searchPartier() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const partier = await getPartier(this.state.id);
                this.setState({
                    loaded: true,
                    loading: false,
                    partier: partier
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
        } else if (this.state.partier) {
            Content = (
                <div className="pb-4">
                    <div>Profile picture : {this.state.partier.picture}</div>
                    <div>First name : {this.state.partier.firstname}</div>
                    <div>Last name : {this.state.partier.lastname}</div>
                    <div>E-mail address : {this.state.partier.emailaddress}</div>
                    <div>Login : {this.state.partier.pseudo}</div>
                    <div>Phone number : {this.state.partier.phonenumber}</div>
                    <div>Reference's phone number : {this.state.partier.refphonenumber}</div>
                    <div>Town : {this.state.partier.addresstown}</div>
                    <div>Zip code : {this.state.partier.addresszipcode}</div>
                    <DeleteButton id={this.state.id} deleteObject={deletePartier} path="/partiers" />
                </div>
            );
        }

        return (
            <div className="bg-base-200 max-w-4xl mx-auto mt-2 rounded">
                <div className="text-2xl mb-4 bg-neutral pb-1 rounded-t">Partier's Informations</div>
                {Content}
            </div>
        );
    }
}

export default withParams(PartierInfos);