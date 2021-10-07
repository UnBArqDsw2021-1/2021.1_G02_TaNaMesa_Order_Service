 
FROM node:14.16

WORKDIR /app

COPY package.json .

RUN yarn
COPY . .

CMD ["/bin/sh", "-c", "yarn build && yarn start"]
