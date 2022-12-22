import React,{ useEffect,useState,useContext } from 'react';
import Auth from '../contexts/Auth';

const Login =(history)=>{
    const{isAuthenticated}=useContext(Auth);

    const[user, setUser]=useState({
        username:"",
        password:""
    })

    const handleChange=({currentTarget})=>{
        const{name,value}=currentTarget;

        setUser({...user,[name]:value});
    }

    const handleSubmit=event=>{
        event.preventDefault();

        console.group();
        console.log(user);
        console.groupEnd()
    }

    useEffect(()=>{
        if(isAuthenticated){
            history.replace('/profile'); 
        }

    },[history,isAuthenticated]);

        return (
            <div className="flex justify-center items-center">
                <form className="bg-gray-700 w-full max-w-4xl mt-4 rounded" onSubmit={handleSubmit}>
                    <fieldset>
                    <legend className="text-2xl mb-4 rounded-t bg-neutral pb-1">Connexion form</legend>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="name">
                            <span className="label-text">Identifiant</span>
                        </label>
                        <input id="email" type="text" name="username" placeholder="ex: besafe@gmail.com" className="form-control" onChange={handleChange} />
                    </div>
                    <div className="form-control max-w-sm mx-auto">
                        <label className="label" htmlFor="name">
                            <span className="label-text">Password</span>
                        </label>
                        <input id="password" name="password" type="password" placeholder="" className="form-control" onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn my-4">Log In</button>
                    </fieldset>
                </form>
            </div>
        );
};

export default Login;
