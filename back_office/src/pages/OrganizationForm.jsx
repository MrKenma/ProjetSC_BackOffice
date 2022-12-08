import React from 'react';

class OrganizationForm extends React.Component {
    render() {
        return (
            <div className="flex justify-center items-center">
                <form className="bg-gray-700 w-full max-w-4xl mt-4 rounded">
                    <div className="text-2xl mb-4 rounded-t bg-neutral pb-1">Organization form</div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="name">
                            <span className="label-text">Organization's name</span>
                        </label>
                        <input id="name" type="text" placeholder="ex: Cercle IG" className="input" />
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="email">
                            <span className="label-text">Email</span>
                        </label>
                        <input id="email" type="email" placeholder="example@site.com" className="input" />
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="password">
                            <span className="label-text">Password</span>
                        </label>
                        <input id="password" type="password" placeholder="********" className="input" />
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="phone">
                            <span className="label-text">Phone number</span>
                        </label>
                        <input id="phone" type="text" placeholder="****/**.**.**" className="input" />
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="resp">
                            <span className="label-text">Responsible's name</span>
                        </label>
                        <input id="resp" type="text" placeholder="ex: Sophie Marchal" className="input" />
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="proof">
                            <span className="label-text">Administrative proof</span>
                        </label>
                        <input id="proof" type="file" className="file-input" />
                    </div>
                    <button type="submit" className="btn my-4">Save changes</button>
                </form>
            </div>
        );
    }
}

export default OrganizationForm;