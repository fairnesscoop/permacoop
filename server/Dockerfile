FROM node:16

WORKDIR /var/www

RUN npm install --location=global npm@8.15.0

# Install dependencies
COPY ./package.json ./package-lock.json ./
RUN npm install

# Bundle app
COPY ./ ./

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
