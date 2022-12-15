import React from 'react';
import {useParams} from 'react-router-dom';
import {getPartier} from "../components/API";
import {postPartier} from "../components/API";
import {updatePartier} from "../components/API";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class PartierForm extends React.Component {
    constructor(props) {
        super(props);
        const id = parseInt(this.props.params.id);

        this.state = {
            id: id,
            emailAddress: "", 
            pseudo: "", 
            password: "", 
            firstName: "", 
            lastName: "", 
            picture: "", 
            phoneNumber: "", 
            refPhoneNumber: "", 
            addressTown: "", 
            addressZipCode: "",
            loading: true,
            error: false,
            errorMessage: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.postPartier = this.postPartier.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== 0) {
            this.searchPartier();
        }
    }

    searchPartier() {
        this.setState({loading: true, error: false}, async () => {
            try {
                const partier = await getPartier(this.state.id);
                this.setState({
                    loaded: true,
                    loading: false,
                    emailAddress: partier.emailAddress, 
                    pseudo: partier.pseudo, 
                    password: partier.password, 
                    firstName: partier.firstName, 
                    lastName: partier.lastName, 
                    picture: partier.picture, 
                    phoneNumber: partier.phoneNumber, 
                    refPhoneNumber: partier.refPhoneNumber, 
                    addressTown: partier.addressTown, 
                    addressZipCode: partier.addressZipCode,
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
        const value = target.value; // const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
    }

    validate() {
        let emailAddressError = "";
        let pseudoError = "";
        let passwordError = "";
        let firstNameError = ""; 
        let lastNameError = "";
        let pictureError = ""; 
        let phoneNumberError = ""; 
        let refPhoneNumberError = "";
        let addressTownError = ""; 
        let addressZipCodeError = "";

        if (!this.state.emailAddress) {
            emailAddressError = "E-mail field is required";
        } // else (existe déjà)
        if (!this.state.pseudo) {
            pseudoError = "Pseudo field is required";
        }
        if (!this.state.password) {
            passwordError = "Password field is required";
        }
        if (!this.state.firstName) {
            firstNameError = "First name field is required";
        }
        if (!this.state.lastName) {
            lastNameError = "Last name is required";
        }
        if (!this.state.picture) {
            pictureError = "Profile picture is required";
        }
        if (!this.state.phoneNumber) {
            phoneNumberError = "Phone number is required";
        }
        if (!this.state.refPhoneNumber) {
            refPhoneNumberError = "Reference phone number is required";
        }
        if (!this.state.addressTown) {
            addressTownError = "Townis required";
        }
        if (!this.state.addressZipCode) {
            addressZipCodeError = "Zip code is required";
        }

        if (emailAddressError || pseudoError || passwordError || firstNameError || lastNameError || pictureError || phoneNumberError || refPhoneNumberError || addressTownError || addressZipCodeError) {
            this.setState({emailAddressError , pseudoError , passwordError , firstNameError , lastNameError , pictureError , phoneNumberError , refPhoneNumberError , addressTownError , addressZipCodeError});
            return false;
        }

        return true;
    }

    postPartier(event) {
        event.preventDefault();

        if (this.validate()) {
            let partier = {
                emailAddress: this.state.emailAddress, 
                pseudo: this.state.pseudo, 
                password: this.state.password, 
                firstName: this.state.firstName, 
                lastName: this.state.lastName, 
                picture: this.state.picture, 
                phoneNumber: this.state.phoneNumber, 
                refPhoneNumber: this.state.refPhoneNumber, 
                addressTown: this.state.addressTown, 
                addressZipCode: this.state.addressZipCode,
            }
            if (this.state.id === 0) {
                const res = postPartier(partier);
            } else {
                partier.id = this.state.id;
                const res = updatePartier(partier);
            }
        }
    }

    render() {
        return (
            <div className="flex justify-center items-center">
                <form className="bg-gray-700 w-full max-w-4xl my-4 rounded" onSubmit={this.postpartier}>
                    <div className="text-2xl mb-4 rounded-t bg-neutral pb-1">Partier form</div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="emailAddress">
                            <span className="label-text">E-mail address</span>
                        </label>
                        <input id="emailAddress" type="email" placeholder="ex: tom.beSafe@gmail.com" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.emailAddress} onChange={this.handleInputChange} />
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.emailAddressError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="pseudo">
                            <span className="label-text">Login</span>
                        </label>
                        <input id="pseudo" type="text" placeholder="ex: TomDup" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.pseudo} onChange={this.handleInputChange} />
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.pseudoError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="password">
                            <span className="label-text">Password</span>
                        </label>
                        <input id="password" type="password" placeholder="********" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.password} onChange={this.handleInputChange} />
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.passwordError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="firstName">
                            <span className="label-text">Firstname</span>
                        </label>
                        <input id="firstName" type="text" placeholder="ex: Thomas" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.firstName} onChange={this.handleInputChange} />
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.firstNameError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="lastName">
                            <span className="label-text">Lastname</span>
                        </label>
                        <input id="lastName" type="text" placeholder="ex: Dupont" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.lastName} onChange={this.handleInputChange} />
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.lastNameError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="name">
                            <span className="label-text">Profile picture</span>
                        </label>
                        <input type="file" label="Choose file" accept=".png, .jpeg" name="file" onChange={(e)=>this.handleFile(e)}/>
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.pictureError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="phoneNumber">
                            <span className="label-text">Phone number</span>
                        </label>
                        <input id="phoneNumber" type="text" placeholder="****/**.**.**" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.phoneNumber} onChange={this.handleInputChange} />
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.phoneNumberError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="refPhoneNumber">
                            <span className="label-text">Reference's phone number</span>
                        </label>
                        <input id="refPhoneNumber" type="text" placeholder="****/**.**.**" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.refPhoneNumber} onChange={this.handleInputChange} />
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.refPhoneNumberError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="addressTown">
                            <span className="label-text">Town's name</span>
                        </label>
                        <input id="addressTown" type="text" placeholder="ex: Paris" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.addressTown} onChange={this.handleInputChange} />
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.addressTownError}</span>
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="addressZipCode">
                            <span className="label-text">Zip code</span>
                        </label>
                        <input id="addressZipCode" type="text" placeholder="5002" className="input placeholder-gray-500 text-gray-200"
                               value={this.state.addressZipCode} onChange={this.handleInputChange} />
                        <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.addressZipCodeError}</span>
                    </div>
                    <button type="submit" className="btn my-4">Save changes</button>
                </form>
            </div>
        );
    }
}

export default withParams(PartierForm);
