FROM ghcr.io/rehearsalsbooking/frontend/node-base:latest as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

ENV VUE_APP_BACKEND_URL="/api"

RUN npm run build

FROM busybox

COPY --from=build-stage /app/dist /frontend