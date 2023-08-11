import React from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {
    getPartier,
    updateUser,
    getProfilePicture,
    deletePartier,
    userEmailExists,
    userPseudoExists,
    register
} from "../components/API";
import {validEmail, validPassword, validPhoneNumber, validPseudo} from "../validation/RegExp";
import FormModal from "../components/FormModal";
import {API_PROFILE_PICTURE} from "../components/API/http";
import DefaultPicture from "../images/default_picture.png";
import DeleteButton from "../components/DeleteButton";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class PartierForm extends React.Component {
    constructor(props) {
        super(props);
        const id = parseInt(this.props.params.id);

        this.state = {
            id: id,
            email: "",
            emailInit: "",
            pseudo: "",
            pseudoInit: "",
            password: "",
            confirmPassword: "",
            firstName: "", 
            lastName: "",
            phoneNumber: "", 
            refPhoneNumber: "",
            addressTown: "", 
            addressZipCode: "",
            emailError: "",
            pseudoError: "",
            firstNameError: "",
            lastNameError: "",
            phoneNumberError: "",
            refPhoneNumberError: "",
            addressTownError: "",
            addressZipCodeError: "",
            passwordError: "",
            confirmPasswordError: "",
            loading: true,
            error: false,
            errorMessage: "",
            modalMessage: "",
            profilePictureUri: DefaultPicture
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.submitPartier = this.submitPartier.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== 0) {
            this.searchPartier();
        } else {
            this.setState({
                loaded: true,
                loading: false
            });
        }
    }

    searchPartier() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const partier = await getPartier(this.state.id);

                this.setState({
                    loaded: true,
                    loading: false,
                    email: partier.user.email,
                    emailInit: partier.user.email,
                    pseudo: partier.user.pseudo,
                    pseudoInit: partier.user.pseudo,
                    firstName: partier.firstname, 
                    lastName: partier.lastname,
                    phoneNumber: partier.user.phonenumber,
                    refPhoneNumber: partier.refphonenumber,
                    addressTown: partier.addresstown, 
                    addressZipCode: partier.addresszipcode,
                });

                if (partier.user.hasuploadedprofilepicture) {
                    const uuid = await getProfilePicture(partier.user.email);

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
        const value = target.value; // const value = target.type === 'checkbox' ? target.checked : target.value;
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
        let emailError = "";
        let pseudoError = "";
        let firstNameError = ""; 
        let lastNameError = "";
        let phoneNumberError = ""; 
        let refPhoneNumberError = "";
        let addressTownError = "";
        let addressZipCodeError = "";
        let passwordError = "";
        let confirmPasswordError = "";


        if (!this.state.email) {
            emailError = "Email field is required";
        } else if (!validEmail.test(this.state.email)) {
            emailError = "Wrong email address format";
        } else if (this.state.email !== this.state.emailInit && await userEmailExists(this.state.email)) {
            emailError = "This email address is already used";
        }

        if (!this.state.pseudo) {
            pseudoError = "Nickname field is required";
        } else if (!validPseudo.test(this.state.pseudo)) {
            pseudoError = "Size must be between 3 and 16 characters. Numbers, letters and underscore are authorized";
        } else if (this.state.pseudo !== this.state.pseudoInit && await userPseudoExists(this.state.pseudo)) {
            pseudoError = "This pseudo is already used";
        }

        if (!this.state.firstName) {
            firstNameError = "First name field is required";
        }

        if (!this.state.lastName) {
            lastNameError = "Last name field is required";
        }

        if (!this.state.phoneNumber) {
            phoneNumberError = "Phone number filed is required";
        } else if (!validPhoneNumber.test(this.state.phoneNumber)) {
            phoneNumberError = "Invalid phone number";
        }

        if (this.state.refPhoneNumber && !validPhoneNumber.test(this.state.refPhoneNumber)) {
            refPhoneNumberError = "Invalid phone number";
        }

        if (!this.state.addressTown) {
            addressTownError = "Town's name field is required";
        }

        if (!this.state.addressZipCode) {
            addressZipCodeError = "Zip code field is required";
        }

        if (this.state.id === 0 && !this.state.password) {
            passwordError = "Password field is required";
        } else if (this.state.password && !validPassword.test(this.state.password)) {
            passwordError = "Your password must be minimum 8 characters long and contain a least a number and a capital letter";
        }

        if (this.state.password !== this.state.confirmPassword) {
            confirmPasswordError = "Passwords do not match";
        }

        this.setState({emailError, pseudoError, firstNameError, lastNameError, phoneNumberError , refPhoneNumberError, addressTownError, addressZipCodeError, passwordError, confirmPasswordError})
        return !(emailError || pseudoError || firstNameError || lastNameError || phoneNumberError || refPhoneNumberError || addressTownError || addressZipCodeError || passwordError || confirmPasswordError);
    }

    async submitPartier(event) {
        event.preventDefault();

        this.setState({
            phoneNumber: this.state.phoneNumber.replace(/[\\.\s/]+/g, ''),
            refPhoneNumber: this.state.refPhoneNumber.replace(/[\\.\s/]+/g, '')
        });

        if (await this.validate()) {
            let user = {
                email: this.state.email,
                password: this.state.password,
                pseudo: this.state.pseudo,
                phoneNumber: this.state.phoneNumber,
                profilePicture: this.state.profilePicture,
                partier: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    refPhoneNumber: this.state.refPhoneNumber,
                    addressTown: this.state.addressTown,
                    addressZipCode: this.state.addressZipCode
                })
            }

            if (this.state.id === 0) {
                this.setState({}, async () => {
                    try {
                        await register(user);
                        this.setState({
                            modalMessage: "Partier added"
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
                            modalMessage: "Partier modified"
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
                    <form className="bg-gray-700 w-full max-w-4xl my-4 rounded" onSubmit={this.submitPartier}>
                        <div className="text-2xl mb-4 rounded-t bg-neutral pb-1">Partier form</div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email address*</span>
                            </label>
                            <input id="email" type="email" placeholder="ex: tom.beSafe@gmail.com" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.email} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.emailError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="pseudo">
                                <span className="label-text">Nickname*</span>
                            </label>
                            <input id="pseudo" type="text" placeholder="ex: TomDup" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.pseudo} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.pseudoError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="firstName">
                                <span className="label-text">Firstname*</span>
                            </label>
                            <input id="firstName" type="text" placeholder="ex: Thomas" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.firstName} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.firstNameError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="lastName">
                                <span className="label-text">Lastname*</span>
                            </label>
                            <input id="lastName" type="text" placeholder="ex: Dupont" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.lastName} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.lastNameError}</span>
                        </div>
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
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="phoneNumber">
                                <span className="label-text">Phone number*</span>
                            </label>
                            <input id="phoneNumber" type="text" placeholder="****/**.**.**" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.phoneNumber} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.phoneNumberError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="refPhoneNumber">
                                <span className="label-text">Emergency contact's phone number</span>
                            </label>
                            <input id="refPhoneNumber" type="text" placeholder="****/**.**.**" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.refPhoneNumber} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.refPhoneNumberError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="addressTown">
                                <span className="label-text">Town's name*</span>
                            </label>
                            <input id="addressTown" type="text" placeholder="ex: Paris" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.addressTown} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.addressTownError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="addressZipCode">
                                <span className="label-text">Zip code*</span>
                            </label>
                            <input id="addressZipCode" type="text" placeholder="5002" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.addressZipCode} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.addressZipCodeError}</span>
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
                        <div className="join mt-8 mb-6">
                            <div className="join-item mx-4">
                                <button type="submit" className="btn">Save changes</button>
                            </div>
                            <DeleteButton id={this.state.id} deleteObject={deletePartier} path="/partiers" />
                        </div>
                    </form>
                    <FormModal modalMessage={this.state.modalMessage} path="/partiers" />
                </div>
            );
        }
    }
}

export default withParams(PartierForm);
