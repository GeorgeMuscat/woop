# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN apk update && apk add curl && npm install --omit-dev
CMD ["node", "src/index.js"]
EXPOSE 3000