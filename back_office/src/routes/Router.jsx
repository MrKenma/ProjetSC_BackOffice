import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import Welcome from "../pages/Welcome";
import Organizations from "../pages/Organizations";
import OrganizationForm from "../pages/OrganizationForm";
import OrganizationInfos from "../pages/OrganizationInfos";
import Event from "../components/Event";
import Partiers from "../components/Partiers";
import Login from "../components/Login";

export default function Router() {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/organizations" element={<Organizations />} />
                <Route path="/organizationForm" element={<OrganizationForm />} />
                <Route path="/organizationInfos/:id" element={<OrganizationInfos />} />
                <Route path="/events" element={<Event />} />
                <Route path="/partiers" element={<Partiers />} />
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}
