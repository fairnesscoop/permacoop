# :seedling: CoopERP :seedling:

CoopERP is an open-source ERP project made by a cooperative (Fairness) for cooperatives.

## Technical stack

- [Node.js](https://nodejs.org)
- [Nestjs](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://fr.reactjs.org/) / [Redux](https://redux.js.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

At the first launch, just execute the following command:

```bash
make install
```

The server and client will be started:

- API documentation available on http://localhost:3000/api
- Client avaible on http://localhost:3001

For the next few times, you just have to run these following commands to start the application:

```bash
cd server && make start
cd client && make start
```

## Helpers

These following commands will display all available helpers

```bash
cd server && make help
cd client && make help
```
