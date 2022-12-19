import { FC, useCallback, useEffect } from "react";

const MapView: FC<any> = () => {
  
  let myWin = window as any
  
  const initMap = useCallback(() => {
    var Maps = myWin.Microsoft.Maps
    new Maps.Map('#bing-map', {
      credentials: process.env.REACT_APP_BING_KEY,
      center: new Maps.Location(51.50632, -0.12714),
      zoom: 3
    })
  }, [])

  myWin.initMap = initMap;

  useEffect(() => {
    if(!document.querySelector('[data-bing="true"]')) {
      const scriptTag = document.createElement('script')
      scriptTag.src = process.env.REACT_APP_BING_SDK_URL + '?callback=initMap'
      scriptTag.async = true
      scriptTag.dataset.bing = 'true'
      document.body.appendChild(scriptTag)
    }
  }, [])


  return (
    <div className="map-view">
      <div id='bing-map' style={{position: 'absolute', width: '100%', height: '100%'}}></div>
    </div>
  )
}

export default MapView;


