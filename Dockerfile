FROM node:lts-alpine
WORKDIR /app

COPY package*.json ./
RUN rm -rf package-lock.json node_modules
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]