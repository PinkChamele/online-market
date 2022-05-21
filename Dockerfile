FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV PORT 3000

EXPOSE $PORT

RUN npm install pm2 -g

CMD  ["pm2", "start", "./dist/main.js", "--no-daemon"], 
