//review MACD
//run "node info.js" in AdvCrpytoBot for MACD info
//Stopped at 28 minutes

const Strategy = require('./strategy')
const tulind = require('tulind')

class SimpleMACD extends Strategy{
    async run({ sticks, time}){
        console.log(tulind.indicators.close)
        const prices = sticks.map(stick => stick.average())

        const shortPeriod = 12
        const longPeriod = 26
        const signalPeriod = 9
        const indicator = tulind.indicators.macd.indicator

        //prices, [short period, long period, signal period]
        const results = await indicator([prices], [shortPeriod, longPeriod, signalPeriod])

        const histogram = results[2]
        const signal = results[1]
        const macd = results[0]

        const lastHisto = histogram[histogram.length - 1]
        const lastSignal = signal[signal.length - 1]
        const lastMACD = macd[macd.length - 1]
        const subbed = (lastMACD - lastSignal) === lastHisto

        console.log (`${lastMACD} ${lastSignal} ${lastHisto} ${subbed}`) 
    }
}

module.exports = SimpleMACD