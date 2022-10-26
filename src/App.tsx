import React, { useState, useEffect } from 'react';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './styles/App.css';

import Forecaster from './components/forecaster/Forecaster'

function App() {
  return (
    <div className="App">
      <Forecaster />
    </div>
  );
}

export default App;
