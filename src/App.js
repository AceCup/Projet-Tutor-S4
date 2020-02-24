import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './App.css';
import 'leaflet/dist/leaflet.css';

class MyMap extends React.Component {
  constructor () {
    super()
    this.state = {
      lat: 49.1191,
      lng: 6.1727,
      zoom: 16
    }
  }

  render () {
    const position = [this.state.lat, this.state.lng]
    return (
      <div class="map-container">
        <Map style={{width: '100%',height: '400px'}} center={position} zoom={this.state.zoom}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
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
