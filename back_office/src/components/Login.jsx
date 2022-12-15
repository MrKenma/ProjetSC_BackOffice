import React from 'react';

class Login extends React.Component{
    render(){
        return (
            <div className="flex justify-center items-center">
                <form className="bg-gray-700 w-full max-w-4xl mt-4 rounded">
                    <div className="text-2xl mb-4 rounded-t bg-neutral pb-1">Connexion form</div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="name">
                            <span className="label-text">Identifiant</span>
                        </label>
                        <input id="name" type="email" placeholder="ex: besafe@gmail.com" className="input" />
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="name">
                            <span className="label-text">Password</span>
                        </label>
                        <input id="name" type="password" placeholder="" className="input" />
                    </div>
                    <button type="submit" className="btn my-4">Log In</button>
                </form>
            </div>
        );
    };
};

export default Login;
