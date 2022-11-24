import React from 'react';

function Login(){
    return (
        <form>
            <div className="group">
                <label htmlFor="email">Identifiant</label>
                <input type="text" name="email"/>
            </div>
            <div className="group">
                <label htmlFor="password">Mot de passe</label>
                <input type="text" name="password" />
            </div>
            <div className="group">
                <button>Connexion</button>
            </div>
        </form>
    );
};

export default Login;