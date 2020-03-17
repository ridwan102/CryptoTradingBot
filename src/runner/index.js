const Historical = require('../historical')
const { Factory } = require('../strategy')  

class Runner {
    constructor({ start, end, interval, product, strategyType }) {
        this.startTime = start
        this.endTime = end
        this.interval
        this.product = product
        this.historical = new Historical({
            start, end, interval, product
        })
        this.strategyType = strategyType
        this.strategy = Factory.create(this.strategyType, {
            onBuySignal: (x) => { this.onBuySignal(x) },
            onSellSignal: (x) => { this.onSellSignal(x) }
        })
    }

    async start () {}
    async onBuySignal(data) {}
    async onSellSignal(data) {}
}

module.exports = exports = Runner