# :seedling: CoopERP :seedling:

CoopERP is an eco-design and open-source ERP solution for cooperatives.

## Technical stack

- [Node.js](https://nodejs.org) / [Nestjs](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Ts-mockito](https://github.com/NagRock/ts-mockito)
- [Jest](https://jestjs.io/)
- [React](https://fr.reactjs.org/) / [Redux](https://redux.js.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Prerequisites

You must have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your system.

## Installation

At the first launch, just execute the following command:

```bash
make install
```

Then, you just have to run these following commands to start the application:

```bash
cd server && make start
cd client && make start
```

The server and client will be started:

- API documentation available on http://localhost:3000/api
- Client avaible on http://localhost:3001

## Helpers

These following commands will display all available helpers

```bash
cd server && make help
build                          Build docker containers
build-dist                     Build dist
connect-db                     Connect to the database
connect-node                   Connect to the node container
lint                           Linter
logs                           Display server logs
ps                             List containers
rm                             Remove docker containers
setup-db                       Setup the database. This command will launch migrations
start                          Start docker containers
stop                           Stop docker containers
test                           Run test suite
```

```bash
cd client && make help
start                          Start react app

```

## Tests

Run the unit test suite with this following command:

```bash
cd server && make test
```

## Credits

Created by [Fairness](https://fairness.coop)
