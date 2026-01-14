FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production
ENV SERVE_STATIC=1
EXPOSE 8080

CMD ["node", "server.js"]
