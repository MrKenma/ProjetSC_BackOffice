import React from 'react';
import {useParams} from 'react-router-dom';
import {
    getOrganization,
    deleteOrganization,
    userPseudoExists,
    userEmailExists,
    register,
    updateUser, getProfilePicture
} from "../components/API";
import {validEmail, validPhoneNumber, validPassword, validPseudo} from "../validation/RegExp";
import FormModal from "../components/FormModal";
import DeleteButton from "../components/DeleteButton";
import DefaultPicture from "../images/defaultOrgaPicture.png";
import {API_PROFILE_PICTURE} from "../components/API/http";

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
            modalMessage: "",
            profilePictureUri: DefaultPicture
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.submitOrganization = this.submitOrganization.bind(this);
        this.deleteOrganization = this.deleteOrganization.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem("isAdmin")) {
            if (this.state.id !== 0) {
                this.searchOrganization();
            } else {
                this.setState({
                    loaded: true,
                    loading: false
                });
            }
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

                if (organization.user.hasuploadedprofilepicture) {
                    const uuid = await getProfilePicture(organization.user.email);

                    this.setState({
                        profilePictureUri: `${API_PROFILE_PICTURE}/${uuid}.jpeg`
                    });
                }
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

    handleFileChange(event) {
        const target = event.target;
        const file = target.files[0];
        const name = target.id;
        const nameUri = name + "Uri";

        this.setState({
            [name]: file
        });

        const reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                this.setState({[nameUri]: reader.result});
            }
        )

        if (file) {
            reader.readAsDataURL(file);
        }
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

        this.setState({
            phoneNumber: this.state.phoneNumber.replace(/[\\.\s/]+/g, ''),
        });

        if (await this.validate()) {
            let user = {
                pseudo: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phoneNumber: this.state.phoneNumber,
                profilePicture: this.state.profilePicture,
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

    async deleteOrganization() {
        await deleteOrganization(this.state.id);
        window.location.replace("/organizations");
    }

    render() {
        if (!sessionStorage.getItem("isAdmin")) {
            return (
                <div className="flex justify-center items-center h-4/5">
                    <div className="text-6xl">You must be admin to access this data</div>
                </div>
            );
        } else if (this.state.loading) {
            return (
                <p>Chargement en cours</p>
            );
        } else if (this.state.error) {
            return (
                <p>{this.state.errorMessage}</p>
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
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="name">
                                <span className="label-text">Profile picture</span>
                            </label>
                            <input type="file" id="profilePicture" accept="image/*" className="file-input"
                                   onChange={this.handleFileChange}/>
                        </div>
                        <div className="avatar mt-4 p-2">
                            <div className="rounded-full w-24">
                                <img id="profilePicturePreview" alt="Profile" src={this.state.profilePictureUri} />
                            </div>
                        </div>
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
                            <DeleteButton deleteObject={this.deleteOrganization} name="organization" />
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