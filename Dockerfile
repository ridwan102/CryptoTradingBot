#To build: docker build . -t ridwan102/advcryptobot
#To run: docker run --name advbot ridwan102/advcryptobot
#To run with API keys: docker run --name advbot -e "COINBASE_PRO_API_KEY = YOUR-COINBASE-PRO-KEY" 
#                      -e "COINBASE_PRO_API_SECRET = YOUR-COINBASE-PRO-SECRET" 
#                      -e "COINBASE_PRO_API_PASSPHRASE = YOUR-COINBASE-PRO-PASSPHRASE"
#                       ridwan102/cryptobot
#                       Or use docker secrets to create API with coinbase: https://docs.docker.com/engine/reference/commandline/secret_create/#examples
#To remove file (?): docker rm advbot

FROM node:alpine

RUN apk --update add git python make g++

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install 

COPY . /usr/src/app

ENV NODE_PATH src
ENV NODE_ENV production

ENTRYPOINT [ "node", "index.js" ]
CMD ["-s", "1584933632", "-e", "1585020032", "-t", "simple", "-i", "60", "-f", "10", "-r", "backtester", "-p", "BTC-USD"]