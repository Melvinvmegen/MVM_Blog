# --------------> The test image
FROM node:24-alpine AS test

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . /app

RUN npm test

# --------------> The build image
FROM node:24-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . /app

RUN npm run generate

# --------------> The production image
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.output/public /usr/share/nginx/html