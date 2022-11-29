import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import Welcome from "../components/Welcome";
import Organization from "../pages/Organization";
import Event from "../components/Event";
import Partiers from "../components/Partiers";
import Login from "../components/Login";

export default function Router() {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/organization" element={<Organization />} />
                <Route path="/event" element={<Event />} />
                <Route path="/partier" element={<Partiers />} />
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}
