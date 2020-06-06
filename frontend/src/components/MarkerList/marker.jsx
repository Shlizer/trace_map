import React from 'react'
import PropTypes from 'prop-types'
import { computed, decorate } from 'mobx'
import { observer } from 'mobx-react'
import store from '../../store'
import styles from './style.module.scss'

class MarkerFromList extends React.Component {
  mouseOver = () => {
    store.hover = this.props.id
  }

  mouseOut = () => {
    store.hover = null
  }

  get classes() {
    return [
      styles.marker,
      this.props.travel ? styles.travel : '',
      store.hover === this.props.id ? styles.hover : ''
    ].join(' ')
  }

  render() {
    return (
      <div className={this.classes} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.id}
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