import React from 'react'
import { observer } from 'mobx-react'
import GoogleMapReact from 'google-map-react'
import GoogleApiKey from './googleApiKey'
import Marker from './marker'
import store from '../../store'
import styles from './style.module.scss'

class GoogleMap extends React.Component {
  state = {
    center: { lat: 52.5, lng: 18.8 },
    zoom: 7
  }

  get mapOptions() {
    return {
      disableDefaultUI: true,
    }
  }

  render() {
    return (
      <div className={styles.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GoogleApiKey }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          options={this.mapOptions}
        >
          {(store.list || []).map(truck => (
            <Marker key={truck.id} {...truck} />
          ))}
        </GoogleMapReact>
      </div>
    )
  }
}

export default observer(GoogleMap)