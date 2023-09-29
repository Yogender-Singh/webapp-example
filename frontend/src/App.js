import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Weather from './Components/Weather';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Homepage/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/signin" element={<Signin/>} />
          <Route exact path="/weather" element={<Weather/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
