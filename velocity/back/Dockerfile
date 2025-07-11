FROM node:20.13.1-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production --no-optional && npm cache clean --force

COPY . .

EXPOSE 4242
ENV NODE_ENV=production

CMD ["node", "server.js"]
