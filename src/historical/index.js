const CoinbasePro = require('coinbase-pro')

class HistoricalService{
    constructor({ start, end, interval = 300, product }){
        this.client = new CoinbasePro.PublicClient()
        this.start = start
        this.end = end
        this.interval = interval
        this.product = product
    }

    async getData(){
        const intervals = this.createRequests()
        const results = await this.performInterval(intervals)
        const timestamps = {}
        const filter = results.filter({
            
        })
        // const results = await this.client.getProductHistoricRates(this.product, {
        //     start: this.start,
        //     end: this.end,
        //     granularity: 300
        // })  
        
        // return results
    }

    async performInterval(intervals){
        if (intervals.length == 0) { return [] }
        const interval = intervals[0]
        const result = await this.performRequest(interval).then(r => r.reverse())
        const next = await this.performInterval(intervals.slice(1))
        return result.concat(next)
    }

    async performRequest({ start, end }){
        const results = await this.client.getProductHistoricRates(this.product, {
            start, end, granularity: this.interval
        })
        return results
    }

    createRequests(){
        const max = 300
        const delta = (this.end.getTime() - this.start.getTime()) * 1e-3
        const numberIntervals = delta / this.interval
        const numberRequests = Math.ceil(numberIntervals / 300)

        const intervals = Array(numberRequests).fill().map((_, reqNum) => {
            const size = this.interval * 300 * 1e3
            const start = new Date(this.start.getTime() + (reqNum * size))
            const end = (reqNum + 1 == numberRequests) ? this.end :
                new Date(start.getTime() + size)
        return { start, end }
        })

        return intervals
        
    }
}


module.exports = HistoricalService