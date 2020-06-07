import React from 'react'
import PropTypes from 'prop-types'
import { computed, decorate } from 'mobx'
import { observer } from 'mobx-react'
import store from '../../../store'
import styles from './style.module.scss'

class MarkerFromList extends React.Component {
  mouseOver = () => {
    store.setHover(this.props.id)
  }

  mouseOut = () => {
    store.setHover()
  }

  get classes() {
    return [
      styles.marker,
      this.props.travel ? styles.travel : '',
      store.isHovered(this.props.id) ? styles.hover : ''
    ].join(' ')
  }

  render() {
    return (
      <div className={this.classes} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <span>{this.props.id}</span>
        <span>[{this.props.lat.toFixed(3)}, {this.props.lng.toFixed(3)}]</span>
      </div>
    )
  }
}

MarkerFromList.propTypes = {
  id: PropTypes.string.isRequired,
  travel: PropTypes.bool.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

decorate(MarkerFromList, {
  classes: computed
})

export default observer(MarkerFromList)