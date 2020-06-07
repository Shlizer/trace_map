import supercluster from 'points-cluster'
import { action, computed, observable, decorate } from 'mobx'

const FETCH_TIME = 100

class Store {
    isFetching = true
    markers = {}
    filter = ''
    hover = []
    mapState = {
        center: { lat: 52.5, lng: 18.8 },
        zoom: 7,
        bounds: null
    }

    constructor() {
        setTimeout(this.fetchList, FETCH_TIME)
    }

    get list() {
        return Object
            .keys(this.markers)
            .map(id => this.markers[id])
            .filter(truck => (store.filter === '' || truck.id.includes(store.filter)))
    }

    get clusters() {
        return this.mapState.bounds
            ? this.getClusters().map(({ wx, wy, numPoints, points }) => ({
                lat: wy,
                lng: wx,
                numPoints,
                id: `${numPoints}_${points[0].id}`,
                points,
            }))
            : [];
    }

    getClusters() {
        return supercluster(this.list, {
            minZoom: 0,
            maxZoom: 16,
            radius: 80,
        })(this.mapState);
    };

    setList(list) {
        for (let i in list) {
            this.markers[i] = { ...(this.markers[i] || {}), ...list[i] }
        }
    }

    setHover(list) {
        [].splice.apply(this.hover, [0, this.hover.length].concat(list))
    }

    isHovered(searchId) {
        return this.hover.findIndex(id => id === searchId) >= 0
    }

    toggleFetch = () => {
        this.isFetching = !this.isFetching
        if (this.isFetching) setTimeout(this.fetchList, FETCH_TIME)
    }

    fetchList = () => {
        fetch('/trucks').then(result => result.json())
            .then(truckList => {
                if (this.isFetching) {
                    if (truckList && truckList.length) this.setList(truckList)
                    setTimeout(this.fetchList, FETCH_TIME)
                }
            })
            .catch(e => setTimeout(this.fetchList, FETCH_TIME))
    }
}

decorate(Store, {
    isFetching: observable,
    markers: observable,
    filter: observable,
    hover: observable,
    mapState: observable,
    clusters: computed,
    list: computed,
    setList: action
})

const store = new Store()
export default store