FROM docker.pkg.github.com/rehearsalsbooking/frontend/node-base:latest

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

EXPOSE 8080
CMD [ "npm", "run", "serve" ]