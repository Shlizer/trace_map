import React from 'react'
import GoogleMapReact from 'google-map-react'
import GoogleApiKey from './googleApiKey'
import Marker from '../Marker'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: { lat: 52.5, lng: 18.8 },
      zoom: 7,
      truckList: []
    }
  }

  componentDidMount() {
    setTimeout(this.fetchList, 1000)
  }

  fetchList = () => {
    fetch('/trucks').then(result => result.json())
      .then(truckList => {
        if (truckList && truckList.length) {
          this.setState({ truckList })
        }
        setTimeout(this.fetchList, 1000)
      })
      .catch(error => setTimeout(this.fetchList, 1000))
  }

  get mapOptions() {
    return {
      disableDefaultUI: true,
    }
  }

  render() {
    return (<div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GoogleApiKey }}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        options={this.mapOptions}
      >
        {this.state.truckList.map(truck => (
          <Marker id={truck.id} {...truck} />
        ))}
      </GoogleMapReact>
    </div>)
  }
}
