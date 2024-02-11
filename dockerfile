FROM node:20

ARG DOTENV_KEY

ENV DOTENV_KEY=$DOTENV_KEY

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ .
COPY .env.vault .

CMD ["node", "index.js"]
