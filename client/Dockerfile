
FROM node:20.10.0

WORKDIR /client

COPY package.json .

COPY . . 

RUN npm install



CMD ["npm", "run", "start"]   