import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './App.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'

 

  
class MyMap extends React.Component {
  constructor (prpos) {
    super(prpos)
    this.state = {
      lat:0,
      lng:0,
      zoom: 16
    }
    //this.displayLocationInfo=this.displayLocationInfo.bind(this);
  }
  displayLocationInfo=(position)=> {
    let la=position.coords.latitude;
    let lo=position.coords.longitude;
    this.setState ({
      lat: la,
      lng: lo
      
  })
    /*this.state.lng = position.coords.longitude;
    this.state.lat = position.coords.latitude;*/
  
   // console.log(`longitude: ${ this.state.lng } | latitude: ${ this.state.lat }`);
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
   const markerimg = new L.Icon({

      iconUrl: 'mr.svg',
    
      iconRetinaUrl: 'mr.svg',
    
      iconAnchor: [20, 40],
    
      popupAnchor: [0, -35],
    
      iconSize: [40, 40],
    
      shadowUrl: null,
    
      shadowSize:null,
    
      shadowAnchor: null,
    
    })

    this.getLocation();
    this.refreshloc();
    const pos = [this.state.lat, this.state.lng]
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="map-container">
        
       <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={pos} icon={markerimg}>
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
