import React from 'react';
import {login} from "../components/API";
import {Navigate} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            userError: "",
            passwordError: "",
            redirection: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
    }

    async validate() {
        let emailError = "";
        let passwordError = "";

        if (!this.state.email) {
            emailError = "Email field is required";
        }

        if (!this.state.password) {
            passwordError = "Password field is required";
        }

        this.setState({emailError, passwordError});

        return !emailError && !passwordError;
    }

    async submitUser(event) {
        event.preventDefault();

        if (await this.validate()) {
            const res = await login(this.state.email, this.state.password);

            switch (res) {
                case 401:
                    this.setState({passwordError: "Wrong password"});
                    break;
                case 404:
                    this.setState({emailError: "User not found"});
                    break;
                default:
            }

            if (res.user !== undefined) {
                sessionStorage.setItem("token", res.token);
                sessionStorage.setItem("userId", res.user.id);
                if (res.user.isadmin) {
                    sessionStorage.setItem("isAdmin", res.user.isadmin);
                }
                window.location.replace("/");
            }
        }
    }

    render() {
        if (sessionStorage.getItem("token") !== null) {
            return (
                <Navigate to="/" />
            );
        } else {
            return (
                <div className="flex justify-center items-center">
                    <form className="bg-gray-700 w-full max-w-4xl my-4 rounded" onSubmit={this.submitUser}>
                        <div className="text-2xl mb-4 rounded-t bg-neutral pb-1">Connexion form</div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email address*</span>
                            </label>
                            <input id="email" type="text" placeholder="ex: besafe@gmail.com" className="input placeholder-gray-500 text-gray-200" onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.emailError}</span>
                        </div>
                        <div className="form-control max-w-sm mx-auto">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Password*</span>
                            </label>
                            <input id="password" type="password" placeholder="password" className="input placeholder-gray-500 text-gray-200" onChange={this.handleInputChange} />
                            <span className="text-red-600 mr-auto ml-2 my-1 text-sm italic">{this.state.passwordError}</span>
                        </div>
                        <button type="submit" className="btn my-4">Login</button>
                    </form>
                </div>
            );
        }
    }
}

export default Login;
