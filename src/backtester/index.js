//Simulates trading with strategies

const Candlestick = require('../models/candlestick')
const randomstring = require('randomstring')
const colors = require('colors/safe')
const Runner = require('../runner')

class Backtester extends Runner{

    async start() {
        try {
            const history = await this.historical.getData()

            await Promise.all(history.map((stick, index) => {
                const sticks = history.slice(0, index + 1)
                return this.strategy.run({
                    sticks, time: stick.startTime
                })
            }))

            const positions = this.strategy.getPositions()
            positions.forEach((p) => {
                p.print()
            })

            const total = positions.reduce((r, p) => {
                return r + p.profit()
            }, 0)

            const prof = `${total}`
            const colored = total > 0 ? colors.green(prof) : colors.red(prof)
            console.log(`Total: ${colored}`)
        } catch (error) {
            console.log(error)
        }
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
}

module.exports = Backtester