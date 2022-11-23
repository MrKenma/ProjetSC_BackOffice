import React from "react";
import Welcome from './components/Welcome';
import NavBar from './components/NavigationBar';
import './App.css';

function App() {
  return (
    <div className="App h-screen">
        <NavBar />
        <Welcome />
    </div>
  );
}

export default App;
