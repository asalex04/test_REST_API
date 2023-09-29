FROM node:16-alpine AS base

WORKDIR /app

COPY package*.json ./

FROM base AS dev
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD [ "npm", "run", "start:dev" ]

FROM base AS prod
ENV NODE_ENV=production
RUN npm install --production
COPY . .
RUN npm global install @nestjs/cli
RUN npm build
CMD [ "npm", "run", "start:prod" ]