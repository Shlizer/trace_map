import React from 'react'
import PropTypes from 'prop-types'
import { computed, decorate } from 'mobx'
import { observer } from 'mobx-react'
import store from '../../store'
import styles from './marker.module.scss'

class MarkerList extends React.Component {
  mouseOver = () => {
    store.hover = this.props.id
  }

  mouseOut = () => {
    store.hover = null
  }

  get className() {
    return [
      styles.pin,
      this.props.travel ? styles.travel : '',
      store.hover === this.props.id ? styles.hover : ''
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

MarkerList.propTypes = {
  id: PropTypes.string.isRequired,
  travel: PropTypes.bool.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

decorate(MarkerList, {
  className: computed
})

export default observer(MarkerList)