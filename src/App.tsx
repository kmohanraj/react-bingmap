import React from 'react';
import MapView from './Map';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React</h1>
       
      </header>
      <div className='container'>
        <MapView
          mapType='grayscale'
          centerLocation={[20.5937, 78.9629]}
          initZoom={5}
        />
      </div>
    </div>
  );
}

export default App;
