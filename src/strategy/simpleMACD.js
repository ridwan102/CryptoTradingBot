//review MACD
//run "node info.js" in AdvCrpytoBot for MACD info
//Generate buy/sell signal when they cross over

const Strategy = require('./strategy')
const tulind = require('tulind')

class SimpleMACD extends Strategy {
    async run({ sticks, time }){

        const prices = sticks.map(stick => stick.average())

        const shortPeriod = 12
        const longPeriod = 26
        const signalPeriod = 9
        const indicator = tulind.indicators.macd.indicator

        const results = await indicator([prices], [12, 26, 9])

        const histogram = results[2]
        const signal = results[1]
        const macd = results[0]

        const length = histogram.length
        if (length < 2) {return}
        const penultimate = histogram[length - 2]
        const last = histogram[length - 1]

        const boundary = 0.5

        const wasAbove = penultimate > boundary
        const wasBelow = penultimate < -boundary
        const isAbove = last > boundary
        const isBelow = last < -boundary

        const open = this.openPositions()

        const price = sticks[sticks.length - 1].close

        if (open.length == 0) {
            
            //buy signal  
            if (wasAbove && isBelow) {
                this.onBuySignal({ price, time })
            }
        
        } else {
            
            open.forEach(p => {
                
                //sell signal 
                if (isAbove && wasBelow) {
                    if (p.enter.price * 1.01 < price) {
                        this.onSellSignal({ price, time, size: p.enter.size, position: p })
                    }
                // } else {

                    //Adjust stop loss
                    // if (p.enter.price * 0.95 > price) {
                    //     this.onSellSignal({ price, time, size: p.enter.size, position: p })
                    // }
                }
            })
        }
    }
}

module.exports = SimpleMACD