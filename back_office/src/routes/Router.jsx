import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import Welcome from "../pages/Welcome";
import Organizations from "../pages/Organizations";
import OrganizationForm from "../pages/OrganizationForm";
import Events from "../pages/Events";
import EventForm from "../pages/EventForm";
import Partiers from "../pages/Partiers";
import PartierForm from "../pages/PartierForm";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

export default function Router() {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/organizations" element={<Organizations />} />
                <Route path="/organizationForm/:id" element={<OrganizationForm />} />
                <Route path="/events" element={<Events />} />
                <Route path="/eventForm/:id" element={<EventForm />} />
                <Route path="/partiers" element={<Partiers />} />
                <Route path="/partierForm/:id" element={<PartierForm />} />
                <Route path="/login" element={<Login />}/>
                <Route path='/profile' element={<Profile />}/>
            </Routes>
        </BrowserRouter>
    )
}
