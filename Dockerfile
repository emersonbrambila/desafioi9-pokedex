FROM node:lts-slim
WORKDIR home/node/esx-pokedex
COPY package.json .
RUN npm install
COPY . .
# RUN npm run test
CMD npm start