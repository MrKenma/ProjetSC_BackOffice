import React from 'react';
import {Navigate} from "react-router-dom";
import {getProfilePicture, getUser, updateUser, userEmailExists, userPseudoExists} from "../components/API";
import FormModal from "../components/FormModal";
import {validEmail, validPassword, validPhoneNumber, validPseudo} from "../validation/RegExp";
import {API_PROFILE_PICTURE} from "../components/API/http";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        const id = localStorage.getItem("userId");

        this.state = {
            id: id,
            email: "",
            emailInit: "",
            password: "",
            confirmPassword: "",
            pseudo: "",
            pseudoInit: "",
            phoneNumber: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: "",
            pseudoError: "",
            phoneNumberError: "",
            loading: true,
            error: false,
            errorMessage: "",
            modalMessage: "",
            profilePictureUri: "/default_picture.png"
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== 0) {
            this.searchUser();
        } else {
            this.setState({
                loaded: true,
                loading: false
            });
        }
    }

    searchUser() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const user = await getUser(this.state.id);

                this.setState({
                    loaded: true,
                    loading: false,
                    email: user.email,
                    emailInit: user.email,
                    pseudo: user.pseudo,
                    pseudoInit: user.pseudo,
                    phoneNumber: user.phonenumber
                });

                if (user.hasuploadedprofilepicture) {
                    const uuid = await getProfilePicture(user.email);

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
        const value = target.value;
        const name = target.id;

        console.log(value);

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
        let phoneNumberError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        if (!this.state.email) {
            emailError = "Email field is required";
        } else if (!validEmail.test(this.state.email)) {
            emailError = "Wrong email format";
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

        if (!this.state.phoneNumber) {
            phoneNumberError = "Phone number filed is required";
        } else if (!validPhoneNumber.test(this.state.phoneNumber)) {
            phoneNumberError = "Invalid phone number";
        }

        if (this.state.password && !validPassword.test(this.state.password)) {
            passwordError = "Your password must be minimum 8 characters long and contain a least a number and a capital letter"
        }

        if (this.state.password !== this.state.confirmPassword) {
            confirmPasswordError = "Passwords do not match";
        }

        this.setState({emailError, pseudoError, phoneNumberError, passwordError, confirmPasswordError});
        return !(emailError || pseudoError || phoneNumberError || passwordError || confirmPasswordError);
    }

    async submitUser(event) {
        event.preventDefault();

        this.setState({phoneNumber: this.state.phoneNumber.replace(/[\\.\s/]+/g, '')});

        if (await this.validate()) {
            let user = {
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                pseudo: this.state.pseudo,
                phoneNumber: this.state.phoneNumber,
                profilePicture: this.state.profilePicture
            }

            this.setState({}, async () => {
                try {
                    await updateUser(user);
                    this.setState({
                        modalMessage: "User modified"
                    });
                } catch (error) {
                    this.setState({
                        modalMessage: error.message
                    });
                }
            });

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
                    <form className="bg-gray-700 w-full max-w-4xl my-4 rounded" onSubmit={this.submitUser}>
                        <div className="text-2xl mb-4 rounded-t bg-neutral pb-1">Profile</div>
                        <legend className="text-lg">Personal data</legend>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="name">
                                <span className="label-text">Email address*</span>
                            </label>
                            <input id="email" type="text" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.email} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.emailError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="name">
                                <span className="label-text">NickName*</span>
                            </label>
                            <input id="pseudo" type="text" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.pseudo} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.pseudoError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="name">
                                <span className="label-text">Phone number*</span>
                            </label>
                            <input id="phoneNumber" type="text" className="input placeholder-gray-500 text-gray-200"
                                   value={this.state.phoneNumber} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.phoneNumberError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="name">
                                <span className="label-text">Profile picture</span>
                            </label>
                            <input id="profilePicture" type="file" accept="image/*" className="file-input flex-none"
                                   onChange={this.handleFileChange} />
                        </div>
                        <div className="avatar mt-4 p-2">
                            <div className="rounded-full w-24">
                                <img id="profilePicturePreview" alt="Profile" src={this.state.profilePictureUri} />
                            </div>
                        </div>
                        <legend className="mt-8 text-lg">Change password</legend>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="name">
                                <span className="label-text">Password</span>
                            </label>
                            <input id="password" type="password" className="input placeholder-gray-500 text-gray-200"
                                   placeholder="********" value={this.state.password} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.passwordError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="name">
                                <span className="label-text">Confirm password</span>
                            </label>
                            <input id="confirmPassword" type="password" className="input placeholder-gray-500 text-gray-200"
                                   placeholder="********" value={this.state.confirmPassword} onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.confirmPasswordError}</span>
                        </div>
                        <button type="submit" className="btn my-4">Save changes</button>
                    </form>
                    <FormModal modalMessage={this.state.modalMessage} id={this.state.id} path="/" />
                </div>
            );
        }
    }
}

export default Profile;