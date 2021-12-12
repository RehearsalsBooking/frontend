FROM ghcr.io/rehearsalsbooking/frontend/node-base:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN cp .env.production-example .env
RUN npm run build

FROM nginx:stable-alpine
COPY ./docker/production/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /app
EXPOSE 80