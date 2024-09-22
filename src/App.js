import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ActionHandler from './components/ActionHandler';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ActionHandler />} />
      </Routes>
    </Router>
  );
};

export default App;
