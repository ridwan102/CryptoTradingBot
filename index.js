//source: https://www.education-ecosystem.com/elliottminns/lK6rL-how-to-build-advanced-cryptocurrency-trading-bot-in-nodejs/Ag37P-how-to-build-advanced-cryptocurrency-trading-bot-5/
//source: https://www.npmjs.com/package/coinbase-pro-node
//source: https://www.npmjs.com/package/coinbase-pro
//Indicator Source: https://www.npmjs.com/package/tulind
//Coinbase Pro Docs: https://docs.pro.coinbase.com/#introduction

/*  

To run Bot: run "node index.js -s [date in unix timestamp] -e [date in unix timestamp]"
            Ie.: "node index.js -s 1523078888 -e 1523383688"
            -s = start date and time ; -e = end date and time 
Current date: run "date +%s"
Calclulate previous date: [unix timestamp] - (60 * 60 * [days in hours])
                        Ie.: 1523554207 - (60 * 60 * 48) = 1523381407 
                             48 = 2 days; 24 = 1 day

*/

//requires
const program = require('commander')
const Backtester = require('./src/backtester')
const config = require('./configuration')

//sets intervals for candlesticks
const now = new Date()
const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1e3))

function toDate (val) {
    return new Date(val * 1e3)
}

program.version('1.0.0')
    .option('-i, --interval [interval]', 'Interval in seconds for candlesticks', 
            parseInt)
    .option('-p, --product [product]', 'Product identifier', 'BTC-USD')
    .option('-s, --start [start]', 'Start time in unix seconds', 
            toDate, yesterday)
    .option('-e, --end [end]', 'End time in unix seconds', toDate, now)
    .parse(process.argv)

const main = async function() {
    const { interval, product, start, end } = program
    
    const tester = new Backtester({
        start, end, product, interval
    })

    await tester.start()

}

main()