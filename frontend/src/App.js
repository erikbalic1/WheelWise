import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/global.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <h1 className="text-center mt-3">WheelWise</h1>
          <p className="text-center">Car Selling Platform</p>
          <p className="text-center mt-2">Project structure initialized successfully!</p>
        </div>
      </div>
    </Router>
  );
}

export default App;
