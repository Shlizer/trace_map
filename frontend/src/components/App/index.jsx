import React from 'react'
import GoogleMapReact from 'google-map-react';
import GoogleApiKey from './googleApiKey';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.center = { lat: 52.5, lng: 18.8 }
    this.zoom = 7
  }
  render() {

    console.log(GoogleApiKey)
    return (<div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GoogleApiKey }}
        defaultCenter={this.center}
        defaultZoom={this.zoom}
      />
    </div>)
  }
}
