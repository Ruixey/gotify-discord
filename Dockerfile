FROM node:slim

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn --immutable
RUN npm install typescript -g

COPY . .

RUN tsc
CMD ["node", "dist/index.js"]
