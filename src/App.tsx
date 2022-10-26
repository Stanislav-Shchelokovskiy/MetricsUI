import React, { useState } from 'react';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import './styles/App.css';
import './styles/CommonSettingsPanel.css';
import './styles/Tribes.css';
import './styles/Tribe.css';
import './styles/Forecast.css';

import Tribes, { TribeData } from './components/Tribes';
import CommonSettingsPanel from './components/CommonSettingsPanel';

function App() {
  return (
    <div className="App">
      <CommonSettingsPanel tribes={
        [
          { id: '1', name: 'WinForms Desktop UI' },
          { id: '2', name: 'Data Visualization and Analysis' },
          { id: '3', name: 'App Frameworks (UI, API, ORM)' },
          { id: '4', name: 'XAML United Team' },
        ]
      } />
      <Tribes tribes={
        [
          { id: '1', name: 'WinForms Desktop UI' },
          { id: '2', name: 'Data Visualization and Analysis' },
        ]
      } />
    </div>
  );
}

export default App;
