#* Stage 1

FROM node:18 as build

WORKDIR /app

COPY /back/package*.json ./

RUN npm install

COPY /back ./

RUN npm run build

#* Stage 2

FROM node:18.17.0-alpine3.18

WORKDIR /app

COPY --from=build /app/package*.json ./

COPY --from=build /app/dist ./dist

RUN npm install --only=production

CMD ["npm", "run", "start:prod"]