# --------------> The build image
FROM node:18.17.0-bullseye-slim as build
RUN apt-get update

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --immutable --immutable-cache --check-cache

COPY . /app

RUN yarn run generate

# --------------> The production image
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.output/public /usr/share/nginx/html