# CoopERP

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/mmarchois/cooperp/CI)
[![codecov](https://codecov.io/gh/mmarchois/cooperp/branch/master/graph/badge.svg)](https://codecov.io/gh/mmarchois/cooperp)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f1e9a74c64bd478b9c00d04c984466b8)](https://www.codacy.com/manual/mmarchois/cooperp?utm_source=github.com&utm_medium=referral&utm_content=mmarchois/cooperp&utm_campaign=Badge_Grade)
[![GitHub issues](https://img.shields.io/github/issues/mmarchois/cooperp.svg)](https://github.com/surmon-china/nodepress/issues)
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

You must have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your system.

## Installation

At the first launch, just execute the following command:

```bash
make install
```

The server and client will be started:

- API documentation available on http://localhost:8080/api
- Client avaible on http://localhost:3000

For the next times you just need to execute the following command to start your application :

```bash
make start
```

A default user has been created :

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@doe.com",
  "password": "$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A", # john
  "apiToken": "$argon2i$v=19$m=4096,t=3,p=1$u7Jw1anFWyHcpfeOxjGYuQ$Ic4YheZZK9aF81q7CW8geSiG6Bsy+f52EnKTyzBlEXE"
}
```

To authenticate it, add a bearer authentication header with his `{apiToken}` to each request.

## Helpers

This command will display all available helpers

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
