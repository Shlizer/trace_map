import { action, computed, observable, decorate } from 'mobx'

const RECONNECT_TIME = 500

class Store {
    ws = null
    markers = {}
    filter = ''
    hover = null

    constructor() {
        this.wsConnect()
    }

    wsConnect() {
        this.ws = new WebSocket('ws://localhost:4000')
        this.ws.onopen = () => this.ws.send('init')

        this.ws.onmessage = event => {
            try {
                const list = JSON.parse(event.data)
                if (Array.isArray(list)) this.setList(list)
            } catch (error) {
                console.error(error)
            }
        }

        this.ws.onclose = () => {
            console.log(`SERVER CONNECTION LOSS. RECONNECTING IN ${RECONNECT_TIME}ms`)
            setTimeout(this.wsCheck.bind(this), RECONNECT_TIME)
        }
    }

    wsCheck() {
        if (!this.ws || this.ws.readyState === WebSocket.CLOSED) this.wsConnect();
    }

    get list() {
        return Object
            .keys(this.markers)
            .map(id => this.markers[id])
            .filter(truck => (store.filter === '' || truck.id.includes(store.filter)))
    }

    setList(list) {
        for (let i in list) {
            const id = list[i].id
            this.markers[id] = { ...(this.markers[id] || {}), ...list[i] }
        }
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