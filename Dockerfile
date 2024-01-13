FROM node:18

WORKDIR /src/app

COPY . .

WORKDIR /src/app/chat
RUN npm install
RUN npm run build

WORKDIR /src/app/server
RUN npm install

EXPOSE 5000

CMD [ "npm","start" ]
