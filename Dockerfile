FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN tsc

CMD ["cd", "dist", "&&", "node", "index.js"]