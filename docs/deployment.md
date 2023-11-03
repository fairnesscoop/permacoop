# deployment

The service is deployed to [Scalingo](https://scalingo.com).

**Contents**

* [Architecture overview](#architecture-overview)
* [How to deploy](#how-to-deploy)
* [Environments](#environnements)
* [Configuration](#configuration)
* [Removing an environment](#removing-an-environment)

## Architecture overview

```
             Scalingo
        ┌-----------------┐
WWW ------- app (:$PORT)  |
        |     |           |
              pg          |
        └-----------------┘
```

## How to deploy

Push to the branch `feat-hotwire`.

## Environnements

Environments are copies of the Permacoop infrastructure. Currently the deployed environments are:

| Name | Description | URL | Deploy branch |
|------|-------------|-----|---------------|
| prod-scaleway | Legacy production environment | https://permacoop.fairness.coop | main |
| prod-scalingo | Rewrite production environment | https://permacoop.osc-fr1.scalingo.io/ | feat-hotwire |

Each environment makes use of several computing resources, listed below:

| Ressource           | Environment | Location   |
|---------------------|-------------|------------|
| VM                  | prod-scaleway | Scaleway   |
| PostgreSQL instance | prod-scaleway | Scaleway   |
| App                 | prod-scalingo | Scalingo   |
| PostgreSQL instance | prod-scalingo | Scaleway   |
| DNS records         | *         | Infomaniak |

## Configuration

The following environment variables are **REQUIRED**:

* `DATABASE_HOST` - Database server hostname
* `DATABASE_PORT` - Database server port
* `DATABASE_USERNAME` - Database server username
* `DATABASE_PASSWORD` - Database server password
* `DATABASE_NAME` - Database name
* `CALENDAR_TOKEN` - Calendar export secret token

### Removing an environment

If an environment is not used anymore, it should be decommissioned to remove unused computing resources.

* Ensure the environment is not used anymore and it can be destroyed permanently.
* Open, review and merge a PR with the following changes:
  * Drop the environment from the environment list in this file.
* Drop the [computing resources](#computing-resources) allocated to the environment.
