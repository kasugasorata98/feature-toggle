FROM node:alpine as base
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:alpine as prod
WORKDIR /app
COPY --from=build ./app/dist ./dist
COPY package.json .
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD ["npm", "start"]