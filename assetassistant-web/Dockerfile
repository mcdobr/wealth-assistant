# Builder image
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY . /app
RUN npm run build

# Production image
FROM nginx:1.25-alpine
COPY --from=prod /app/build /usr/share/nginx/html
EXPOSE 80
