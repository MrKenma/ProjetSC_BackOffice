import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import Welcome from "../components/Welcome";
import Organizations from "../components/Organizations";
import Events from "../components/Events";
import Partiers from "../components/Partiers";

export default function Router() {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/organizations" element={<Organizations />} />
                <Route path="/events" element={<Events />} />
                <Route path="/partiers" element={<Partiers />} />
            </Routes>
        </BrowserRouter>
    )
}