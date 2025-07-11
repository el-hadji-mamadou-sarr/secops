FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4242
ENV NODE_ENV=production
CMD ["node", "server.js"]
