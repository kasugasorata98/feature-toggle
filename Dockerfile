FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install && npm install ts-node -g && npm install typescript -g

COPY . .

EXPOSE 3000

CMD ["npm", "start"]