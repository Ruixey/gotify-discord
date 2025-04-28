FROM node:slim

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn --immutable

COPY . .

RUN yarn build
CMD ["node", "dist/index.js"]
