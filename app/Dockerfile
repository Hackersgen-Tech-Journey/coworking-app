FROM node:21.1.0-slim

WORKDIR /app
COPY . /app

RUN npm install

CMD npm run dev -- --host

EXPOSE 5173:5173