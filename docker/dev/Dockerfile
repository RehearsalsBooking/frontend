FROM docker.pkg.github.com/rehearsalsbooking/frontend/node-base:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 8080
CMD [ "npm", "run", "serve" ]