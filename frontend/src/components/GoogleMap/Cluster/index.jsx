import React from 'react'
import PropTypes from 'prop-types'
import { computed, decorate } from 'mobx'
import { observer } from 'mobx-react'
import store from '../../../store'
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

  get className() {
    return [
      styles.pin,
      this.isHovered ? styles.hover : ''
    ].join(' ')
  }

  render() {
    return (
      <div>
        <div className={this.className} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <span>{this.props.numPoints}</span>
        </div>
      </div>
    )
  }
}

Cluster.propTypes = {
  numPoints: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

decorate(Cluster, {
  isHovered: computed,
  className: computed
})

export default observer(Cluster)