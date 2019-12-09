# CoopERP

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/mmarchois/cooperp/CI)
[![codecov](https://codecov.io/gh/mmarchois/cooperp/branch/master/graph/badge.svg)](https://codecov.io/gh/mmarchois/cooperp)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f1e9a74c64bd478b9c00d04c984466b8)](https://www.codacy.com/manual/mmarchois/cooperp?utm_source=github.com&utm_medium=referral&utm_content=mmarchois/cooperp&utm_campaign=Badge_Grade)
[![GitHub issues](https://img.shields.io/github/issues/mmarchois/cooperp.svg)](https://github.com/mmarchois/cooperp/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/mmarchois/cooperp.svg)](https://github.com/mmarchois/cooperp)
[![GitHub license](https://img.shields.io/github/license/mmarchois/cooperp.svg)](https://github.com/mmarchois/cooperp)

CoopERP is an eco-design and open-source ERP solution for cooperatives.

## Technical stack

- [Node.js](https://nodejs.org) / [Nestjs](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io)
- [Ts-mockito](https://github.com/NagRock/ts-mockito)
- [Jest](https://jestjs.io/)
- [React](https://fr.reactjs.org/) / [Redux](https://redux.js.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Prerequisites

You must have **[Docker](https://www.docker.com/)**, **[Docker Compose](https://docs.docker.com/compose/)** and **[Node](https://nodejs.org/en/)** (>= 12) installed on your system.

## Installation

At **the first launch**, just execute these commands to install your application :

```bash
make install
make client-start
```

For the **next times** you just need to execute these commands to start your application :

```bash
make api-start
make client-start
```

The server and client will be started:

- API documentation available on http://localhost:8080/api
- Client avaible on http://localhost:3000

## Security

The client must send the user `apiToken` in the Authorization header when making requests to protected resources : `Authorization: Bearer <apiToken>`

At the installation of the project a default user was created :

```json
{
  "email": "john@doe.com",
  "password": "john"
}
```

To retrieve the `apiToken`, make a post request on `/login` with a user email and password.

## Helpers

This following command will display all available helpers :

```bash
make help
```

## Tests

Run the unit test suite with this following command:

```bash
make api-test
```

## Credits

Created by [Fairness](https://fairness.coop)
