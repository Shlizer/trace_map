import React from 'react'
import PropTypes from 'prop-types'
import { computed, decorate } from 'mobx'
import { observer } from 'mobx-react'
import store from '../../../store'
import styles from './style.module.scss'

class Marker extends React.Component {
  mouseOver = () => {
    store.setHover(this.props.id)
  }

  mouseOut = () => {
    store.setHover()
  }

  get className() {
    return [
      styles.pin,
      this.props.travel ? styles.travel : '',
      store.isHovered(this.props.id) ? styles.hover : ''
    ].join(' ')
  }

  render() {
    return (
      <div>
        <div className={this.className} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <span>{this.props.id}</span>
        </div>
        <div className={[styles.pulse, this.props.travel ? styles.travel : ''].join(' ')} />
      </div>
    )
  }
}

Marker.propTypes = {
  id: PropTypes.string.isRequired,
  travel: PropTypes.bool.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

decorate(Marker, {
  className: computed
})

export default observer(Marker)