import React from 'react'
import styles from './style.module.scss'

export default class MarkerList extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.pin}>
          <span>{this.props.id}</span>
        </div>
        {this.props.travel ? <div className={styles.pulse} /> : null}
      </div>
    )
  }
}
