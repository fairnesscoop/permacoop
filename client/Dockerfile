FROM node:16

WORKDIR /var/www

RUN chmod -R a+rx /root
RUN chmod -R a+w /root/.npm

RUN npm install --location=global npm@8.16.0

# Install dependencies
COPY ./package.json ./package-lock.json ./
RUN npm install

# Bundle app
COPY ./ ./

EXPOSE 3000
EXPOSE 5000
EXPOSE 10000

CMD ["npm", "run", "dev"]
