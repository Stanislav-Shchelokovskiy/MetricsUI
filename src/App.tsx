import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { useState } from 'react';
import './styles/common.css';
import Tribes, { Tribe } from './components/tribes'
import CommonSettings from './components/CommonSettingsPanel'

function App() {


  return (
    <div className="App">
      <CommonSettings tribes={
        [
          { id: '1', name: 'WinForms Desktop UI' }, 
          { id: '2', name: 'Data Visualization and Analysis' },
          { id: '3', name: 'App Frameworks (UI, API, ORM)' },
          { id: '4', name: 'XAML United Team' },
        ]
      } />
    </div>
  );
}

export default App;
