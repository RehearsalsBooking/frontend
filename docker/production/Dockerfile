FROM docker.pkg.github.com/rehearsalsbooking/frontend/node-base:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

RUN npm run build

VOLUME /app/dist