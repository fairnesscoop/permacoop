# deployment

The service is deployed to [Infomaniak Jelastic Cloud](https://www.infomaniak.com/fr/hebergement/serveurs-dedies-et-cloud/jelastic-cloud), which runs the [Virtuozzo](https://www.virtuozzo.com/application-platform-docs/) PaaS platform.

**Contents**

* [Architecture overview](#architecture-overview)
* [How to deploy](#how-to-deploy)
* [Environments](#environnements)
* [Configuration](#configuration)
* [Removing an environment](#removing-an-environment)

## Architecture overview

```
                Jelastic environment
        ┌--------------------------------┐
WWW ------- nginx (:443)                 |
        |     └------- server (:3000)    |
        └------------------|-------------┘
                           |
                     ┌------------┐
                     | PostgreSQL |
                     └------------┘
                       Database
```

## How to deploy

TODO

## Environnements

Environments are copies of the Permacoop infrastructure. Currently the deployed environments are:

| Name    | Description               | URL                             | Deploy branch |
|---------|---------------------------|---------------------------------|---------------|
| prod    | Production environment    | https://permacoop.fairness.coop | `feat/hotwire |

Each environment makes use of several computing resources, listed below:

| Ressource           | Environment | Location |
|---------------------|-------------|----------|
| Cloud instance (VM) | All         | Jelastic |
| PostgreSQL instance | All         | Jelastic |
| DNS records         | All         | Gandi    |

## Configuration

The following environment variables are **REQUIRED**:

* `CALENDAR_TOKEN` - Calendar export secret token
* `DATABASE_HOST` - Database server hostname
* `DATABASE_PORT` - Database server port
* `DATABASE_USERNAME` - Database server username
* `DATABASE_PASSWORD` - Database server password
* `DATABASE_NAME` - Database name

### Removing an environment

If an environment is not used anymore, it should be decommissioned to remove unused computing resources.

* Ensure the environment is not used anymore and it can be destroyed permanently.
* Open, review and merge a PR with the following changes:
  * Drop the corresponding environment directory in `ansible/environments`
  * Drop the environment from the environment list in this file.
* Drop the [computing resources](#computing-resources) allocated to the environment.
