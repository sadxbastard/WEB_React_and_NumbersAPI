FROM node:22.4.0
WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

ENV HOST 0.0.0.0

EXPOSE 5173

CMD ["npm", "run", "prod"]