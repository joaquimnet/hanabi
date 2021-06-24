FROM node:16-alpine

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm ci

RUN node scripts/version.js hanabi > version.txt

CMD ["npm", "start"]
