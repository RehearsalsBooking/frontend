FROM ghcr.io/rehearsalsbooking/frontend/node-base:latest as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

RUN cp .env.production .env

ENV VUE_APP_BACKEND_URL="/api"
ENV VUE_APP_OAUTH_REDIRECT_URL="/"

RUN npm run build

FROM busybox

COPY --from=build-stage /app/dist /frontend