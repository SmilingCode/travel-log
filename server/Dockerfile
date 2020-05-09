# Dockerfile for Node Express Backend api (dev)
FROM node:10.16-alpine

# ARG NODE_ENV=development

# Working direction to be server
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

# Install Dependencies
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 1337

CMD ["npm", "start"]