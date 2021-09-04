FROM ghcr.io/rehearsalsbooking/frontend/node-base:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

RUN npm run build

VOLUME /app/dist