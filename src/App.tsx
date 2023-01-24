import React, { useEffect, useState } from 'react';
import MapView from './Map';
import fetchPostcode from './service/fetchPostcode';

type getLatLong = [number, number]

function App() {

  const initial = [0, 0]

  const [location, setLocation] = useState<getLatLong>(initial as any)
  
  const getLocations = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        setLocation([position.coords.latitude,position.coords.longitude])})
    }
  }

  const handleOnPostcode = async () => {
    const postcode = fetchPostcode(location)
    console.log(postcode, '------------------')
  }

  useEffect(() => {
    getLocations()
  }, [location])
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>React</h1>
        <>{location}</>
        <button onClick={handleOnPostcode}>Post code</button>
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
