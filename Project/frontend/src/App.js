import './App.css';

//import "dist/output.css";

import React from 'react';
// import { Route , Routes } from 'react-router-dom';

import NavBar from './components/navbar/navbar';

function App() {
  return (
    <div>
      <NavBar/>
      {/* <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes> */}
    </div>
  );
}

export default App;
