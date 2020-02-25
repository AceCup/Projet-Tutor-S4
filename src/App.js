import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './App.css';
import 'leaflet/dist/leaflet.css';

 

  
class MyMap extends React.Component {
  constructor (prpos) {
    super(prpos)
    this.state = {
      lat:49.1191,
      lng:6.1727,
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
 

  render () {
    this.getLocation();
    const pos = [this.state.lat, this.state.lng]
    return (
      <div className="map-container">
        <Map style={{width: '100%',height: '800px'}} center={pos} zoom={this.state.zoom}>
          <TileLayer
            url='http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={pos}>
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
