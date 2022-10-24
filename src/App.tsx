import React, { useState } from 'react';
import './styles/common.css';
import Tribes, { Tribe } from './components/tribes'

function App() {
  const [tribes, setTribes] = useState<Array<Tribe>>([{ id: 'id1', name: 'qwe' }, { id: 'id2', name: 'asd' }]);

  return (
    <div className="FlexColumn">
      <Tribes tribes={tribes} />
    </div>
  );
}

export default App;
