import React from 'react'
import { observer } from 'mobx-react'
import GoogleMapReact from 'google-map-react'
import GoogleApiKey from '../../googleApiKey'
import Marker from './marker'
import Cluster from './cluster'
import store from '../../store'
import styles from './style.module.scss'

class GoogleMap extends React.Component {
  get mapOptions() {
    return {
      disableDefaultUI: true,
      minZoom: 4,
      maxZoom: 19,
    }
  }

  onChange = ({ center, zoom, bounds }) => {
    Object.assign(store.mapState, { center, zoom, bounds })
  }

  render() {
    return (
      <div className={styles.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GoogleApiKey }}
          defaultCenter={store.mapState.center}
          defaultZoom={store.mapState.zoom}
          options={this.mapOptions}
          onChange={this.onChange}
        >
          {store.clusters.map(cluster => cluster.numPoints > 1
            ? <Cluster key={cluster.id} {...cluster} />
            : <Marker key={cluster.points[0].id} {...cluster.points[0]} />
          )}
        </GoogleMapReact>
      </div>
    )
  }
}

export default observer(GoogleMap)