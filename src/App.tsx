import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './styles/App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Forecaster from './components/forecaster/Forecaster'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <BrowserRouter>
          <Routes>
            <Route path='/forecaster'
              element={<Forecaster />}>
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
