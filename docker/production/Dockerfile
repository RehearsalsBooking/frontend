FROM ghcr.io/rehearsalsbooking/frontend/node-base:latest as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

RUN npm run build

FROM scratch

COPY --from=build-stage /app/dist /frontend

VOLUME /frontend