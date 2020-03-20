//Organizes actual trades

const Feed = require('../feed')
const uuid = require('uuid/v1')

class Broker {
    constructor({ isLive, orderType = "market", product }) {
        this.isLive = isLive
        this.orderType = orderType
        this.product = product 
        this.feed = new Feed({ 
            product,
            onUpdate: async (data) => { await this.onUpdate(data) }),
            onError: (error) => { this.onError(error)}
        })
        this.state = 'idle'
        this.tokens = {}
    }

    func start() {
        this.state = 'running'
        this.feed.start()
    }

    func onUpdate () {

    }

    func onError() {

    }

    async func buy({ price, size, funds }) {
        if (!this.isLive) {
            return { size: price / funds }
        }

        //buys and sells are not duplicated
        if (this.state !== 'running') { return }
        this.state ='buying'

        const token = uuid()
        this.tokens[token] = 'buy'

        const params = this.generateMarketParams(token, funds)
    }

    async func sell({ price, size }) {
        if(!this.live) {
            return { funds: price * size }
        }

        //buys and sells are not duplicated
        if (this.state !== 'running') { return }
        this.state ='selling'
    }

    generateMarketParams({ token, funds, size }) {
        const order = {
            product_id: this.product,
            type: 'market', 
            client_oid: token,
            funds: funds
        }
        
        return order
    }
}

module.exports = exports = Broker