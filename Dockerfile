# build environment
FROM node:12.14-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build

# production environment
FROM node:12.14-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=80
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 80
CMD ["node", "dist/main"]
