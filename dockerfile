FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ .

EXPOSE 8080

CMD ["node", "index.js"]
