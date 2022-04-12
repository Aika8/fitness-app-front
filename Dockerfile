FROM node:latest
WORKDIR /fitness-app-front
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]