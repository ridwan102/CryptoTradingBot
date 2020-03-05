//source: https://www.education-ecosystem.com/elliottminns/lK6rL-how-to-build-advanced-cryptocurrency-trading-bot-in-nodejs/Ag37P-how-to-build-advanced-cryptocurrency-trading-bot-5/
//source: https://www.npmjs.com/package/coinbase-pro-node
//source: https://www.npmjs.com/package/coinbase-pro
//Coinbase Pro Docs: https://docs.pro.coinbase.com/#introduction


//requires
const program = require('commander')
const Historical = require('./src/historical')
const config = require('./configuration')


//sets intervals for candlesticks
const now = new Date()
const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1e3))

function toDate (val) {
    return new Date(val * 1e3)
}

program.version('1.0.0')
    .option('-i, --interval [interval]', 'Interval in seconds for candlesticks', parseInt)
    .option('-p, --product [product]', 'Product identifier', 'BTC-USD')
    .option('-s, --start [start]', 'Start time in unix seconds', toDate, yesterday)
    .option('-e, --end [end]', 'End time in unix seconds', toDate, now)
    .parse(process.argv)

const main = async function() {
    const { interval, product, start, end } = program

    const service = new Historical ({
        start,
        end,
        product,
        interval
    })

    const data = await service.getData()
    console.log(data)
}

main()