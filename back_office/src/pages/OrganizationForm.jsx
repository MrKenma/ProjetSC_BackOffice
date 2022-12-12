import React from 'react';
import {useParams} from 'react-router-dom';
import {postOrganization} from "../components/API";
import {updateOrganization} from "../components/API";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class OrganizationForm extends React.Component {
    constructor(props) {
        super(props);
        const id = parseInt(this.props.params.id);

        this.state = {
            id: id,
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
            responsibleName: "",
            administrativeProof: "",
            nameError: "",
            emailError: "",
            passwordError: "",
            phoneNumberError: "",
            responsibleNameError: "",
            adminProofError: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.postOrganization = this.postOrganization.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== 0) {
            this.searchOrganization();
        }
    }

    searchOrganization() {

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value; // const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
    }

    validate() {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        let phoneNumberError = "";
        let responsibleNameError = "";
        let adminProofError = "";

        if (!this.state.name) {
            nameError = "Name field is required";
        } // else (existe déjà)
        if (!this.state.email) {
            emailError = "Email field is required";
        }
        if (!this.state.password) {
            passwordError = "Password field is required";
        }
        if (!this.state.phoneNumber) {
            phoneNumberError = "Phone number field is required";
        }
        if (!this.state.responsibleName) {
            responsibleNameError = "Responsible name is required";
        }
        if (!this.state.administrativeProof) {
            adminProofError = "Administrative proof is required";
        }

        if (nameError || emailError || passwordError || phoneNumberError || responsibleNameError || adminProofError) {
            this.setState({nameError, emailError, passwordError, phoneNumberError, responsibleNameError, adminProofError});
            return false;
        }

        return true;
    }

    postOrganization(event) {
        event.preventDefault();

        if (this.validate()) {
            let organization = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phoneNumber: this.state.phoneNumber,
                responsibleName: this.state.responsibleName,
                administrativeProof: this.state.administrativeProof
            }
            if (this.state.id === 0) {
                const res = postOrganization(organization);
            } else {
                organization.id = this.state.id;
                const res = updateOrganization(organization);
            }
        }
    }

    render() {
        return (
            <div className="flex justify-center items-center">
                <form className="bg-gray-700 w-full max-w-4xl my-4 rounded" onSubmit={this.postOrganization}>
                    <div className="text-2xl mb-4 rounded-t bg-neutral pb-1">Organization form</div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="name">
                            <span className="label-text">Organization's name</span>
                        </label>
                        <input id="name" type="text" placeholder="ex: Cercle IG" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.name} onChange={this.handleInputChange} />
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.nameError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="email">
                            <span className="label-text">Email</span>
                        </label>
                        <input id="email" type="email" placeholder="example@site.com" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.email} onChange={this.handleInputChange}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.emailError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="password">
                            <span className="label-text">Password</span>
                        </label>
                        <input id="password" type="password" placeholder="********" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.password} onChange={this.handleInputChange}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.passwordError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="phoneNumber">
                            <span className="label-text">Phone number</span>
                        </label>
                        <input id="phoneNumber" type="text" placeholder="****/**.**.**" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.phoneNumber} onChange={this.handleInputChange}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.phoneNumberError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="responsibleName">
                            <span className="label-text">Responsible's name</span>
                        </label>
                        <input id="responsibleName" type="text" placeholder="ex: Sophie Marchal" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.responsibleName} onChange={this.handleInputChange}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.responsibleNameError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="administrativeProof">
                            <span className="label-text">Administrative proof</span>
                        </label>
                        <input id="administrativeProof" type="text" placeholder="file name" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.administrativeProof} onChange={this.handleInputChange}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.adminProofError}</span>
                    </div>
                    <button type="submit" className="btn my-4">Save changes</button>
                </form>
            </div>
        );
    }
}

export default withParams(OrganizationForm);
/*
<div className="form-control max-w-sm mx-auto">
    <label className="label" htmlFor="proof">
        <span className="label-text">Administrative proof</span>
    </label>
    <input id="proof" type="file" className="file-input" />
</div>
*/