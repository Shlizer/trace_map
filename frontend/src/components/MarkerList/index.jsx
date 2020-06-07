import React from 'react'
import { decorate, computed } from 'mobx'
import { observer } from 'mobx-react'
import store from '../../store'
import Marker from './marker'
import Cluster from './cluster'
import styles from './style.module.scss'

class MarkerList extends React.Component {
  state = { opened: true }

  get classes() {
    return [styles.container, this.state.opened ? '' : styles.closed].join(' ')
  }

  get togglerOpen() {
    return <div className={styles.togglerOpen} onClick={this.toggleOpen} />
  }

  get togglerFetch() {
    return <div className={[styles.togglerFetch, store.isFetching ? '' : styles.closed].join(' ')} onClick={store.toggleFetch} />
  }

  toggleOpen = () => {
    this.setState({ opened: !this.state.opened })
  }

  changeFilter = event => {
    store.filter = event.target.value
  }

  render() {
    return (
      <div className={this.classes}>
        {this.togglerOpen}
        {this.togglerFetch}
        <input type='text' value={store.filter} onChange={this.changeFilter} placeholder='Filtruj...' />
        <div className={styles.list}>
          {store.clusters.map(cluster => cluster.numPoints > 1
            ? <Cluster key={cluster.id} {...cluster} />
            : <Marker key={cluster.points[0].id} {...cluster.points[0]} />
          )}
        </div>
      </div>
    )
  }
}

decorate(MarkerList, {
  togglerFetch: computed
})

export default observer(MarkerList)