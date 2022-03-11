FROM node:14.3

WORKDIR /var/www

# Install dependencies
COPY ./package.json ./package-lock.json ./
RUN npm install

# Bundle app
COPY ./ ./

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
