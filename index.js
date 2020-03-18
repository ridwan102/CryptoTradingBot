/*

Building Trading Bot Guide: https://www.education-ecosystem.com/elliottminns/lK6rL-how-to-build-advanced-cryptocurrency-trading-bot-in-nodejs/Ag37P-how-to-build-advanced-cryptocurrency-trading-bot-5/
Coinbase Pro Source: https://www.npmjs.com/package/coinbase-pro
CoinBase Pro Source: https://www.npmjs.com/package/coinbase-pro-node
Coinbase Pro Docs: https://docs.pro.coinbase.com/#introduction
Indicators Source: https://www.npmjs.com/package/tulind
 
To run live: node index.js --live
To run Bot: run "node index.js -s [start time in unix seconds] -e [end time in unix seconds]"
            Ie.: "node index.js -s 1523078888 -e 1523383688"
            -s = start time in unix seconds ; -e = end time in unix seconds 
Current date: run "date +%s"
Convert date from Unix to "normal" date: run "date -r [unix date]"
                                    Ie.: date -r 1583867600 = Tue. Mar 10 15:13:20 EDT 2020

Calclulate previous date: [unix timestamp] - (60 * 60 * 24 * [days])
                        Ie.: 1523554207 - (60 * 60 * 24 * 2) = 1523381407
Use Different Strategies: node index.js -s [start time in unix seconds] -e [end time in unix seconds] -t [strategy]
                        Ie.: node index.js -s 1522778888 -e 1523555786 -t macd
                             node index.js -s 1522778888 -e 1523555786 -t simple

*/

//Example: node index.js -s 1523379430 -e 1523984230 -t macd
//Today: node index.js -s 1584044093 -e 1584476093 -t macd

//requires
const program = require('commander')
const Backtester = require('./src/backtester')
const Trader = require('./src/trader')
const config = require('./configuration')
const Ticker = require('./src/ticker')

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
    .option('-t, --strategy [strategy]', 'Strategy Type')
    .option('-l, --live', 'Run Live')
    .parse(process.argv)

const main = async function() {
    const { interval, product, start, end, strategy, live } = program

    if(live) {
        const trader = new Trader({
            start, end, product, interval, strategyType: strategy
        })
    
        await trader.start()

    } else {
        const tester = new Backtester({
            start, end, product, interval, strategyType: strategy
        })

        await tester.start()
    }

}

main()