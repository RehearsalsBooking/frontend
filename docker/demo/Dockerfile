FROM ghcr.io/rehearsalsbooking/frontend/node-base:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN cp .env.demo .env
RUN npm run build --mode demo

FROM nginx:stable-alpine
COPY ./docker/demo/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /app
EXPOSE 80