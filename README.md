<h1 align="center"><a href="https://fairness.coop"><img src="https://fairness.coop/image/fairness_logo.svg" alt="Fairness"></a></h1>

Permacoop is an open source and eco design ERP solution reserved for worker-owned business.

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/fairnesscoop/permacoop/ci.yml?branch=master)
[![codecov](https://codecov.io/gh/fairnesscoop/permacoop/branch/master/graph/badge.svg)](https://codecov.io/gh/fairnesscoop/permacoop)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/fairnesscoop/permacoop/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/fairnesscoop/permacoop/?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3bf4f001d4904cdb89e71f2793d1c6b7)](https://www.codacy.com/gh/fairnesscoop/permacoop?utm_source=github.com&utm_medium=referral&utm_content=fairnesscoop/permacoop&utm_campaign=Badge_Grade)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/fairnesscoop/permacoop)
[![GitHub license](https://img.shields.io/github/license/fairnesscoop/permacoop.svg)](https://github.com/fairnesscoop/permacoop)

## Technical stack

- [Node.js](https://nodejs.org) / [Nestjs](https://nestjs.com/)
- [TypeORM](https://typeorm.io)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/) / [ts-mockito](https://github.com/NagRock/ts-mockito)
- [Svelte](https://svelte.dev/) / [SvelteKit](https://kit.svelte.dev) / [Sapper](https://sapper.svelte.dev/) (legacy)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Prerequisites

You must have **[PostgreSQL](https://www.postgresql.org/)** installed, or **[Docker](https://www.docker.com/)** and **[Docker Compose](https://docs.docker.com/compose/)** to run PostgreSQL using the provided `docker-compose.yml`.

Ensure you have [Node.js](https://nodejs.org) **16.x** and `node-gyp` installed globally (`npm install -g node-gyp`).

## Quickstart

First, install dependencies:

```bash
make install
```

Then start the servers, database and other services:

```
make start
```

In a separate terminal, run database migrations:

```
make database-migrate
```

Then, add seed data to the database:

```
make database-seed
```

This command will create the default user "John Doe":

```json
{
  "email": "john@doe.com",
  "password": "john"
}
```

The server and client will be started:

- API documentation available on <http://localhost:3000/api>
- Client available on <http://localhost:3001/>

## Helpers

To view all available commands, run:

```bash
make help
```

### Building and serving

To serve the built server and client locally, run:

```bash
make build
make start-dist
```

### Tests

To run tests, use:

```bash
make test
```

For E2E tests, you will need to install additional dependencies first:

```bash
make install-client-e2e
```

Run E2E tests using:

```bash
make test-client-e2e
```

### Code quality

To run automatic code formatting, run:

```bash
make format
```

To run linters and code checks, use:

```bash
make linter
```

### Database

To generate a migration from the current state of the code, run:

```bash
make database-migration NAME=add_some_column
```

To reset the database with seeded data, run:

```bash
make database-reset
make database-seed
```

## Security

The client must send the user `apiToken` in the Authorization header when making requests to protected resources : `Authorization: Bearer <apiToken>`


To retrieve the `apiToken`, make a post request on `/login` with a user email and password.

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

## License

MIT
