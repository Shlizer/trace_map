import { action, computed, observable, decorate } from 'mobx'

class Store {
    markers = {}
    filter = ''
    hover = null

    constructor() {
        setTimeout(this.fetchList, 100)
    }

    get list() {
        return Object
            .keys(this.markers)
            .map(id => this.markers[id])
            .filter(truck => (store.filter === '' || truck.id.includes(store.filter)))
    }

    setList(list) {
        for (let i in list) {
            this.markers[i] = { ...(this.markers[i] || {}), ...list[i] }
        }
    }

    fetchList = () => {
        fetch('/trucks').then(result => result.json())
            .then(truckList => {
                if (truckList && truckList.length) this.setList(truckList)
                setTimeout(this.fetchList, 100)
            })
            .catch(e => setTimeout(this.fetchList, 100))
    }
}

decorate(Store, {
    markers: observable,
    filter: observable,
    hover: observable,
    list: computed,
    setList: action
})

const store = new Store()
export default store