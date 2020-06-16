# Instructions

To run live: node index.js --live

To run Bot: run "node index.js -s [start time in unix seconds] -e [end time in unix seconds]"
        Example: "node index.js -s 1523078888 -e 1523383688"
        -s = start time in unix seconds ; -e = end time in unix seconds 

Current date: run "date +%s"

Convert date from Unix to "normal" date: run "date -r [unix date]"
        Example: date -r 1583867600 = Tue. Mar 10 15:13:20 EDT 2020

Calculate previous date: [unix timestamp] - (60 * 60 * 24 * [days])
        Example: 1523554207 - (60 * 60 * 24 * 2) = 1523381407

Use Different Strategies: node index.js -s [start time in unix seconds] -e [end time in unix seconds] -t [strategy]
	Example: node index.js -s 1522778888 -e 1523555786 -t macd
                 node index.js -s 1522778888 -e 1523555786 -t simple


Example: node index.js -s 1523379430 -e 1523984230 -t macd
Today: node index.js -s 1584044093 -e 1584476093 -t macd

# Sources

Building Trading Bot Guide: https://www.education-ecosystem.com/elliottminns/lK6rL-how-to-build-advanced-cryptocurrency-trading-bot-in-nodejs/Ag37P-how-to-build-advanced-cryptocurrency-trading-bot-5/

Coinbase Pro Sources, Docs, and Indicators: 
https://www.npmjs.com/package/coinbase-pro
https://www.npmjs.com/package/coinbase-pro-node
https://docs.pro.coinbase.com/#introduction
https://www.npmjs.com/package/tulind