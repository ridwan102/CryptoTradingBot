const Runner = require('../runner')
const Ticker = require('../ticker')
const Broker = require('../broker')
const Candlestick = require('../models/candlestick')
const randomstring = require('randomstring')
const colors = require('colors/safe')

class Trader extends Runner {

    constructor (data) {
        super(data)
        this.isLive = data.live
        this.funds = data.funds
        this.broker = new Broker({ isLive: this.isLive })
        this.ticker = new Ticker({
            product: this.product,
            onTick: async (tick) => { await this.onTick(tick) },
            onError: (error) => { this.onError(error) }
        })
    }

    async start () {
        this.currentCandle = null
        this.history = await this.historical.getData()
        this.ticker.start()
    }

    async onBuySignal({ price, time }) {
        console.log(`BUY BUY BUY ${price}`)
        const result = await this.broker.buy({ funds: this.funds, price })
        const id = randomstring.generate(20)
        this.strategy.positionOpened({
            price: result.price, time, size: result.size, id
        })
    }

    async onSellSignal({ price, size, time, position }){
        console.log(`SELL SELL SELL ${price}`)
        const result = await this.broker.sell({ size, price })
        this.strategy.positionClosed({
            price: result.price, time, size: result.size, id: position.id
        })
    }

    async onTick(tick) {
        const parsed = Date.parse(tick.time)
        const time = isNaN(parsed) ? new Date() : new Date(parsed)
        const price = parseFloat(tick.price)
        const volume = parseFloat(tick.last_size)

        console.log(`Time: ${time} Price: ${price.toFixed(2)} Volume: ${volume}`)

        try{
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

            //creates copy of history
            const sticks = this.history.slice()
            sticks.push(this.currentCandle)

            await this.strategy.run({
                sticks: sticks, 
                time: time
            })

            if(this.currentCandle.state === 'closed') {
                const candle = this.currentCandle
                this.currentCandle = null
                this.history.push(candle)

                this.printPositions()
                this.printProfit()

            }
        } catch (error) { console.log(error) }
    }

    onError(error) {
    }
}

module.exports = exports = Trader