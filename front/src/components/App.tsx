import React from 'react';
import './App.css';
import Dashboard from "./dashboard/Dashboard";

function App() {
  return (
    <div >
        <h1>Main page</h1>
        <header>
            <h3>
                <button >create dashboard</button> </h3>
        </header>
      <Dashboard/>
    </div>
  );
}

export default App;
