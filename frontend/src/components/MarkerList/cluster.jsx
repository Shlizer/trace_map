import React from 'react'
import PropTypes from 'prop-types'
import { computed, decorate } from 'mobx'
import { observer } from 'mobx-react'
import store from '../../store'
import styles from './style.module.scss'

class Cluster extends React.Component {
  mouseOver = () => {
    store.setHover(this.props.points.map(point => point.id))
  }

  mouseOut = () => {
    store.setHover()
  }

  get isHovered() {
    return store.hover.findIndex(id => this.props.points.findIndex(point => point.id === id) >= 0) >= 0
  }

  get classes() {
    return [
      styles.marker,
      this.props.travel ? styles.travel : '',
      this.isHovered ? styles.hover : ''
    ].join(' ')
  }

  render() {
    return (
      <div className={this.classes} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <span>{this.props.id} (<b>{this.props.numPoints})</b></span>
        <span>[{this.props.lat.toFixed(3)}, {this.props.lng.toFixed(3)}]</span>
      </div>
    )
  }
}

Cluster.propTypes = {
  id: PropTypes.string.isRequired,
  numPoints: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

decorate(Cluster, {
  classes: computed
})

export default observer(Cluster)