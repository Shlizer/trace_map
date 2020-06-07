import React from 'react'
import PropTypes from 'prop-types'
import { computed, decorate } from 'mobx'
import { observer } from 'mobx-react'
import Marker from '../Marker'
import store from '../../../store'
import styles from './style.module.scss'

class Cluster extends React.Component {
  state = { opened: false }

  mouseOver = () => {
    store.setHover(this.props.points.map(point => point.id))
  }

  mouseOut = () => {
    store.setHover()
  }

  toggleOpen = () => {
    this.setState({ opened: !this.state.opened })
  }

  get isHovered() {
    return store.hover.findIndex(id => this.props.points.findIndex(point => point.id === id) >= 0) >= 0
  }

  get title() {
    return (
      <div className={styles.title}>
        <span>{this.props.id.substring(2, this.props.id.length)} (<b>{this.props.numPoints})</b></span>
        <span>[{this.props.lat.toFixed(3)}, {this.props.lng.toFixed(3)}]</span>
      </div>
    )
  }

  get classes() {
    return [
      styles.cluster,
      this.state.opened ? styles.opened : '',
      this.isHovered ? styles.hover : ''
    ].join(' ')
  }

  render() {
    return (
      <div className={this.classes} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.toggleOpen}>
        {this.title}
        {this.state.opened
          ? this.props.points.map(point => <Marker key={point.key} {...point} />)
          : null}
      </div>
    )
  }
}

Cluster.propTypes = {
  id: PropTypes.string.isRequired,
  numPoints: PropTypes.number.isRequired,
  points: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    travel: PropTypes.bool.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  })).isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

decorate(Cluster, {
  classes: computed
})

export default observer(Cluster)