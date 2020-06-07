import { action, computed, observable, decorate } from 'mobx'
import supercluster from 'points-cluster'
import worker_script from './worker';

const FETCH_TIME = 100
const CLUSTER_RADIUS = 80

class Store {
    firstFetch = true
    isFetching = true
    markers = {}
    filter = ''
    hover = []
    worker = null
    mapState = {
        center: { lat: 52.5, lng: 17 },
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
            radius: CLUSTER_RADIUS,
        })(this.mapState);
    };

    setList(list = {}) {
        for (let i in list) {
            this.markers[list[i].id] = { ...(this.markers[list[i].id] || {}), ...list[i] }
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
        const endpoint = this.firstFetch ? '/trucks' : '/trucksMove'
        this.firstFetch = false

        this.worker = new Worker(worker_script);
        this.worker.onmessage = ({ data }) => {
            if (data.list && this.isFetching) this.setList(data.list)
            if (data.error) console.log('Worker error: ', data.error)
            setTimeout(this.fetchList, FETCH_TIME)
        }
        this.worker.postMessage({ base: document.baseURI, endpoint })
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