import React from 'react'
import GoogleMap from '../GoogleMap'
import MarkerList from '../MarkerList'
import store from '../../store'
import styles from './style.module.scss'

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <MarkerList />
        <GoogleMap />
      </div>
    )
  }
}

export default App