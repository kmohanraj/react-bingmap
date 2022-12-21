import React, { FC, useCallback, useEffect } from "react";
import pushPins from '../src/MockPushPins.json'


type DescriptionType = {
  name: string
}

type ContentType = {
  title: string,
  description: DescriptionType
}

type MapViewType = {
  mapType: string
  centerLocation: [number, number],
  initZoom: number
}

const MapView: FC<MapViewType> = ({ mapType, centerLocation, initZoom }) => {
  
  let myWin = window as any
  const initMap = useCallback(() => {
    var Maps = myWin.Microsoft.Maps
    var map = new Maps.Map('#bing-map', {
      credentials: process.env.REACT_APP_BING_KEY,
      center: new Maps.Location(centerLocation[0], centerLocation[1]),
      // bounds: Maps.LocationRect.fromEdges(49.234, 24.175, -65.573, -125.778),
      mapTypeId: Maps.MapTypeId[mapType],
      showLogo: false,
      zoom: initZoom
    })
    let infobox = new Maps.Infobox(map.getCenter(), {
      visible: false
    })
    infobox.setMap(map)
    addPushPins(map, infobox, Maps)
  }, [])


  const addPushPins = (map: any, infobox: any, Maps: any) => {
    for (let ele in pushPins) {
      let pin = new Maps.Pushpin(pushPins[ele].center, pushPinMarker(pushPins[ele].icon))
      const data: ContentType = pushPins[ele]?.content
      handleOnInfobox(pin, infobox, data, Maps)
      map.entities.push(pin)
    } 
  }

  const handleOnInfobox = (pin: any, infobox: any, data: ContentType, Maps: any) => {
    Maps.Events.addHandler(pin, 'click', (e: any) => {
      infobox.setOptions({
        visible: true,
        location: e.target.getLocation(),
        title: data.title,
        description: data.description.name
      })
    })
  }

  const pushPinMarker = (iconName: string) =>{
    const mapIcons = ['F', 'IS', 'FM', 'KK', 'M'];
    return {
      icon: mapIcons.includes(iconName) && require(`./images/legend-${iconName?.toLocaleLowerCase()}.svg`)
    }
  }

  // Initialize the Map
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


