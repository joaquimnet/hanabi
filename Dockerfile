FROM node:14-alpine

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

RUN node scripts/version.js hanabi > version.txt

CMD ["npm", "start"]
