import React from "react";
import Welcome from './components/Welcome';
import NavBar from './components/NavigationBar';
import Organizations from "./components/Organizations";
import './App.css';

function App() {
  return (
    <div className="App h-screen">
        <NavBar />
        <Organizations />
    </div>
  );
}

export default App;
