import React from 'react'
import { observer } from 'mobx-react'
import store from '../../store'
import MarkerFromList from './marker'
import styles from './style.module.scss'

class MarkerList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: true
    }
  }

  get classes() {
    return [styles.list, this.state.opened ? '' : styles.closed].join(' ')
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
        <div className={styles.toggler} onClick={this.toggleOpen} />
        <input type='text' value={store.filter} onChange={this.changeFilter} placeholder='Filtruj...' />
        {store.list.map(truck => <MarkerFromList id={truck.id} {...truck} />)}
      </div>
    )
  }
}

export default observer(MarkerList)