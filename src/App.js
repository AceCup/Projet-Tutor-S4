import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './App.css';
//import 'leaflet/dist/leaflet.css';
import {Icon} from 'leaflet'

 

  
class MyMap extends React.Component {
  constructor (prpos) {
    super(prpos)
    this.state = {
      lat:0,
      lng:0,
      zoom: 16
    }
    
  }
  displayLocationInfo=(position)=> {
    let la=position.coords.latitude;
    let lo=position.coords.longitude;
    this.setState ({
      lat: la,
      lng: lo
      
  })
    
  }
  getLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
  }
  else {
    alert("Sorry, browser does not support geolocation!");
  }
}
refreshloc(){
  const watcher = navigator.geolocation.watchPosition(this.displayLocationInfo);
  setTimeout(() => {
    navigator.geolocation.clearWatch(watcher);
  }, 1000);
}

  render () {
  /*const markerimg = new Icon({

      iconUrl: './mr.svg',
      iconAnchor: [20, 40],
      popupAnchor: [0, -35],
      iconSize: [40, 40]
    })*/
    
    this.getLocation();
    this.refreshloc();
    const pos = [this.state.lat, this.state.lng]
    return (
      <div className="map-container">
        
       <Map className="map" center={pos} zoom={this.state.zoom} maxZoom={19}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={pos} >
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>
        
      </div>
     
      )
  }
}

export default MyMap
