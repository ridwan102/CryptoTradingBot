const Runner = require('../runner')
const Ticker = require('../ticker')

class Trader extends Runner {

    constructor (data) {
        super(data)
        this.ticker = new Ticker({
            product: this.product,
            onTick: async (tick) => { await this.onTick(tick) },
            onError: (error) => { this.onError(error) }
        })
    }

    async start () {
        const history = await this.historical.getData()
        this.ticker.start()
    }

    async onBuySignal({ price, time }){
        const id = randomstring.generate(20)
        this.strategy.positionOpened({
            price, time, size: 1.0, id
        })
    }

    async onSellSignal({ price, size, time, position }){
        this.strategy.positionClosed({
            price, time, size, id: position.id
        })
    }

    async onTick(tick) {
        const time = Date.parse(tick.time)
        const price = parseFloat(tick.price)
        const volume = parseFloat(tick.volume)

        console.log(`Time: ${time} Price: ${price}`)

        if (this.curentCandle) {

            //onPrice is whenever new price comes in you update it
            this.currentCandle.onPrice({ price, volume, time })
        } else {
            this.currentCandle = new Candlestick({
                price: price,
                volume: volume,
                interval: this.interval,
                startTime: time
            })
        }
    }

    onError(error) {
    }
}

module.exports = exports = Trader