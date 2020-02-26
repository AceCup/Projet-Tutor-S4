
import './App.css';
import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
//import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import user from './assets/user.png';
// import {Icon} from 'leaflet'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
 

  

class MyMap extends React.Component {
  constructor (prpos) {
    super(prpos)
    this.state = {
      lieux: [],
      lat:0,
      lng:0,
      zoom: 16,

    }
    
  }
  componentDidMount() {
    axios.get(`https://devweb.iutmetz.univ-lorraine.fr/~muller668u/projetS4/lieux.php`)
      .then(res => {
        this.setState({lieux: res.data})
        console.log(this.state.lieux);
      })
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


userIcon = L.icon({
  iconUrl: user,
  // shadowUrl: 'user.png',

  iconSize:     [60, 60], // size of the icon
  // shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [30, 60], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
});



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
          <Marker position={pos} icon={this.userIcon}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>
        <Button block="true">Liste monuments</Button>
		<ul>
        { this.state.lieux.map(lieu => <li>{lieu.NomLieu} {lieu.LatLieu} {lieu.LongLieu}</li>)}
      </ul>
      </div>
     
      )
  }
}

export default MyMap
