FROM node:16-alpine as chat

WORKDIR /app/chat

COPY chat/package.json /app/chat/

RUN npm install 

COPY chat /app/chat/

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY server/package.json /app/

RUN npm install

COPY server /app/

COPY --from=chat /app/chat/build /app/chat

EXPOSE 8080

CMD [ "npm", "start" ]
