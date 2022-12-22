import React from "react";
import { useContext } from "react";
import { Navigate, Route} from "react-router-dom";
import Auth from "../contexts/Auth";

const AuthenticatedRoute=({path, element})=>{
    const{isAuthenticated} =useContext(Auth);

    return isAuthenticated?(
        <Route to={path} element={element}/>
    ):(
        <Navigate to="/Login"/>
    )
}

export default AuthenticatedRoute;
