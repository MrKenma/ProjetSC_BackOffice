import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import Welcome from "../pages/Welcome";
import Organizations from "../pages/Organizations";
import OrganizationForm from "../pages/OrganizationForm";
import OrganizationInfos from "../pages/OrganizationInfos";
import Events from "../pages/Events";
import EventForm from "../pages/EventForm";
import EventInfos from "../pages/EventInfos";
import Partiers from "../pages/Partiers";
import PartierForm from "../pages/PartierForm";
import PartierInfos from "../pages/PartierInfos";
import Login from "../components/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import AuthenticatedRoute from "../components/AuthenticatedRoute";

export default function Router() {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/organizations" element={<Organizations />} />
                <Route path="/organizationForm/:id" element={<OrganizationForm />} />          
                <Route path="/organizationInfos/:id" element={<OrganizationInfos />} />
                <Route path="/events" element={<Events />} />
                <Route path="/eventForm/:id" element={<EventForm />} />
                <Route path="/eventInfos/:id" element={<EventInfos />} /> 
                <Route path="/partiers" element={<Partiers />} />
                <Route path="/partierForm/:id" element={<PartierForm />} />
                <Route path="/partierInfos/:id" element={<PartierInfos />} /> 
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route exact path='/' element={<AuthenticatedRoute path="/profile" element={<Profile/>}/>}/>
            </Routes>
        </BrowserRouter>
    )
}
