FROM node:14.3

WORKDIR /var/www

# Install dependencies
COPY ./package.json ./package-lock.json ./
RUN npm install

# Bundle app and run default build
COPY ./ ./
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
