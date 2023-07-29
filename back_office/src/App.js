import React, { useState } from "react";
import Router from "./routes/Router";
import './App.css';
import { hasAuthenticated } from "./services/AuthAPI";
import Auth from "./contexts/Auth";

function App() {
  const[isAuthenticated,setIsAuthenticated] = useState(hasAuthenticated());
  return (
    <div className="App h-screen">
      <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
        <Router />
      </Auth.Provider>
    </div>
  );
}

export default App;
