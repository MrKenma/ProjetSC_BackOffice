import React from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {
    getOrganization,
    deleteOrganization,
    userPseudoExists,
    userEmailExists,
    register,
    updateUser
} from "../components/API";
import {validEmail, validPhoneNumber, validPassword, validPseudo} from "../validation/RegExp";
import FormModal from "../components/FormModal";
import DeleteButton from "../components/DeleteButton";

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
            nameInit: "",
            email: "",
            emailInit: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            responsibleName: "",
            isVerified: false,
            administrativeProof: "",
            nameError: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: "",
            phoneNumberError: "",
            responsibleNameError: "",
            loading: true,
            error: false,
            errorMessage: "",
            modalMessage: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitOrganization = this.submitOrganization.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== 0) {
            this.searchOrganization();
        } else {
            this.setState({
                loaded: true,
                loading: false
            });
        }
    }

    searchOrganization() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const organization = await getOrganization(this.state.id);

                this.setState({
                    loaded: true,
                    loading: false,
                    name: organization.user.pseudo,
                    nameInit: organization.user.pseudo,
                    email: organization.user.email,
                    emailInit: organization.user.email,
                    phoneNumber: organization.user.phonenumber,
                    responsibleName: organization.responsiblename,
                    isVerified: organization.isverified
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
    }

    async validate() {
        let nameError = "";
        let emailError = "";
        let phoneNumberError = "";
        let responsibleNameError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        if (!this.state.name) {
            nameError = "Name field is required";
        } else if (!validPseudo.test(this.state.name)) {
            nameError = "Size must be between 3 and 16 characters. Numbers, letters and underscore are authorized";
        } else if (this.state.name !== this.state.nameInit && await userPseudoExists(this.state.name)) {
            nameError = "Name already used";
        }

        if (!this.state.email) {
            emailError = "Email field is required";
        } else if (!validEmail.test(this.state.email)) {
            emailError = "Wrong email adress format";
        } else if (this.state.email !== this.state.emailInit && await userEmailExists(this.state.email)) {
            emailError = "Email already used";
        }

        if (!this.state.phoneNumber) {
            phoneNumberError = "Phone number field is required";
        } else if (!validPhoneNumber.test(this.state.phoneNumber)) {
            phoneNumberError = "Invalid phone number";
        }

        if (!this.state.responsibleName) {
            responsibleNameError = "Responsible name is required";
        }

        if (this.state.id === 0 && !this.state.password) {
            passwordError = "Password field is required";
        } else if (this.state.password && !validPassword.test(this.state.password)) {
            passwordError = "The password must be minimum 8 characters long and contain a least a number and a capital letter";
        }

        if (this.state.password !== this.state.confirmPassword) {
            confirmPasswordError = "Passwords do not match";
        }

        this.setState({nameError, emailError, phoneNumberError, responsibleNameError, passwordError, confirmPasswordError});
        return !(nameError || emailError || phoneNumberError || responsibleNameError || passwordError || confirmPasswordError);
    }

    async submitOrganization(event) {
        event.preventDefault();

        if (await this.validate()) {
            let user = {
                pseudo: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phoneNumber: this.state.phoneNumber,
                organization: JSON.stringify({
                    responsibleName: this.state.responsibleName,
                    isVerified: this.state.isVerified
                })
            }

            if (this.state.id === 0) {
                this.setState({}, async () => {
                    try {
                        await register(user);
                        this.setState({
                            modalMessage: "The organization has been added"
                        });
                    } catch (error) {
                        this.setState({
                            modalMessage: error.message
                        });
                    }
                });
            } else {
                this.setState({}, async () => {
                    try {
                        user.id = this.state.id;
                        await updateUser(user);
                        this.setState({
                            modalMessage: "The organization has been modified"
                        });
                    } catch (error) {
                        this.setState({
                            modalMessage: error.message
                        });
                    }
                });
            }

            document.getElementById("submitModal").click();
        }
    }

    render() {
        if (!localStorage.getItem("isAdmin")) {
            return (
                <Navigate to="/" />
            );
        } else {
            return (
                <div className="flex justify-center items-center">
                    <form className="bg-gray-700 w-full max-w-4xl my-4 rounded" onSubmit={this.submitOrganization}>
                        <div className="text-2xl mb-4 rounded-t bg-neutral pb-1">Organization form</div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="name">
                                <span className="label-text">Organization's name*</span>
                            </label>
                            <input id="name" type="text" placeholder="ex: Cercle IG" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.name} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.nameError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email*</span>
                            </label>
                            <input id="email" type="email" placeholder="example@site.com" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.email} onChange={this.handleInputChange}/>
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.emailError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="phoneNumber">
                                <span className="label-text">Phone number*</span>
                            </label>
                            <input id="phoneNumber" type="text" placeholder="****/**.**.**" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.phoneNumber} onChange={this.handleInputChange}/>
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.phoneNumberError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="responsibleName">
                                <span className="label-text">Responsible's name*</span>
                            </label>
                            <input id="responsibleName" type="text" placeholder="ex: Sophie Marchal" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.responsibleName} onChange={this.handleInputChange}/>
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.responsibleNameError}</span>
                        </div>
                        {
                            this.state.id !== 0 ?
                                <div className="form-control max-w-sm mx-auto">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Is verified</span>
                                        <input id="isVerified" type="checkbox" className="checkbox mr-64"
                                               checked={this.state.isVerified} onChange={this.handleInputChange}/>
                                    </label>
                                </div>
                                :
                                ""
                        }
                        {this.state.id !== 0 ? <legend className="mt-8 text-lg">Change password</legend> : ""}
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="name">
                                <span className="label-text">{"Password" + (this.state.id === 0 ? "*" : "")}</span>
                            </label>
                            <input id="password" type="password" className="input placeholder-gray-500 text-gray-200"
                                   placeholder="********" value={this.state.password} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.passwordError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="name">
                                <span className="label-text">{"Confirm password" + (this.state.id === 0 ? "*" : "")}</span>
                            </label>
                            <input id="confirmPassword" type="password" className="input placeholder-gray-500 text-gray-200"
                                   placeholder="********" value={this.state.confirmPassword} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.confirmPasswordError}</span>
                        </div>
                        <div className="join mt-4 mb-6">
                            <div className="join-item mx-4">
                                <button type="submit" className="btn">Save changes</button>
                            </div>
                            <DeleteButton id={this.state.id} deleteObject={deleteOrganization} path="/organizations" />
                        </div>
                    </form>
                    <FormModal modalMessage={this.state.modalMessage} path="/organizations" />
                </div>
            );
        }
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

<div className="form-control max-w-sm mx-auto">
    <label className="label" htmlFor="administrativeProof">
        <span className="label-text">Administrative proof</span>
    </label>
    <input id="administrativeProof" type="text" placeholder="file name" className="input placeholder-gray-500 text-gray-200"
           value={this.state.administrativeProof} onChange={this.handleInputChange}/>
    <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.adminProofError}</span>
</div>
*/