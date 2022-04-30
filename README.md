<h1 align="center"><a href="https://fairness.coop"><img src="https://fairness.coop/image/fairness_logo.svg" alt="Fairness"></a></h1>

Permacoop is an open source and eco design ERP solution reserved for worker-owned business.

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/fairnesscoop/permacoop/CI)
[![codecov](https://codecov.io/gh/fairnesscoop/permacoop/branch/master/graph/badge.svg)](https://codecov.io/gh/fairnesscoop/permacoop)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/fairnesscoop/permacoop/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/fairnesscoop/permacoop/?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3bf4f001d4904cdb89e71f2793d1c6b7)](https://www.codacy.com/gh/fairnesscoop/permacoop?utm_source=github.com&utm_medium=referral&utm_content=fairnesscoop/permacoop&utm_campaign=Badge_Grade)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/fairnesscoop/permacoop)
[![GitHub license](https://img.shields.io/github/license/fairnesscoop/permacoop.svg)](https://github.com/fairnesscoop/permacoop)

## Technical stack

- [Node.js](https://nodejs.org) / [Nestjs](https://nestjs.com/)
- [TypeORM](https://typeorm.io)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) / [Ts-mockito](https://github.com/NagRock/ts-mockito)
- [Svelte](https://svelte.dev/) / [Sapper](https://sapper.svelte.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)

## Prerequisites

You must have **[Docker](https://www.docker.com/)** and **[Docker Compose](https://docs.docker.com/compose/)**.

Ensure you have [Node.js](https://nodejs.org) v14.3 and `node-gyp` installed globally (`npm install -g node-gyp`). (Node version should match to avoid any build issues with binary dependencies such as `argon2`.)

## Installation

At **the first launch**, just execute this command to install your application :

```bash
make install
```

For the **next times** you just need to execute this command to start your application :

```bash
make start

```

The server and client will be started:

- API documentation available on <http://localhost/api>
- Client avaible on <http://localhost/>

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
make test
```

## Features

- Tasks management
- Projects management
- Customers management
- Calendar (timesheets etc.)
- Human Resources
  - Meal tickets
  - Leaves
  - Cooperators / employee
  - Savings records
- Accounting
  - Quotations
  - Daily rates
  - Invoicing
- Contacts managment

## Credits

Created by [Fairness](https://fairness.coop)
