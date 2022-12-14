# prod

_This document describes Fairness' production deployment of Permacoop. It is meant for Fairness team members._

* [Architecture overview](#architecture-overview)
* [How to deploy](#how-to-deploy)
  * [Install](#install)
  * [Deploying an environment](#deploying-an-environment)
* [Environments](#environnements)
  * [Deployed environments](#deployed-environments)
  * [Adding an environment](#adding-an-environment)
  * [Secrets](#secrets)
  * [Decommisionning an environment](#decommissioning-an-environment)
* [Tools](#tools)
  * [Testing on a Vagrant VM](#testing-on-a-vagrant-vm)
* [Troubleshooting](#troubleshooting)

## Architecture overview

The deployed service architecture is as follows:

```
                         VM
        ┌--------------------------------┐
        |     ┌---------- client (:3001) |
WWW ------- nginx (:443)                 |
        |     └---------- api (:3000)    |
        └------------------|-------------┘
                           |
                     ┌------------┐
                     | PostgreSQL |
                     └------------┘
                       Database
```

The client and API processes are managed with [Supervisor](https://supervisord.org/).

TLS certificates are managed with [Certbot](https://eff-certbot.readthedocs.io) (LetsEncrypt).

## How to deploy

Deployment must be performed in the terminal.

### Install

**Prerequisites**

* You must have SSH access to the production server.
* Ensure Python 3.8+ is installed on your machine (on Linux: `apt install python3.8-venv`).
* You must have the Vault password in `ansible/vault-password` (this file is ignored by git). Ask a team member to share it with you securely.

Move to the Ansible directory:

```bash
permacoop $ cd ansible
```

Before deploying for the first time, install deployment dependencies:

```bash
permacoop/ansible $ make install
```

Check your configuration by pinging the prod server:

```bash
permacoop/ansible $ make ping env=prod
```

Example output:

```
permacoop.fairness.coop | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

### Deploying an environment

To deploy the environment `<ENV>`, run:

```bash
permacoop/ansible $ make deploy env="<ENV>"
```

See [Troubleshooting](#troubleshooting) if you encounter issues.

## Environnements

### Deployed environments

Environments are copies of the Permacoop infrastructure. Currently the deployed environments are:

| Name    | Description               | URL                             | Deploy branch |
|---------|---------------------------|---------------------------------|---------------|
| prod    | Production environment    | https://permacoop.fairness.coop | `master`      |
| vagrant | [Vagrant test VM] (local) | http://localhost:3080           | `git_version` in `ansible/environments/vagrant/group_vars/web.yml` |

[Vagrant test VM]: #testing-on-a-vagrant-vm

### Computing resources

Each environment makes use of several computing resources, listed below:

| Ressource           | Environment | Location |
|---------------------|-------------|----------|
| Cloud instance (VM) | All         | Scaleway |
| PostgreSQL instance | All         | Scaleway |
| DNS records         | All         | Gandi    |

### Adding an environment

To add a new environment, first create its [computing resources](#computing-resources).

Create a directory for the environment in `ansible/environments/`, using existing environments as a reference.

The following files are **REQUIRED**:

* `hosts` - Inventory file (see: [Inventory (Ansible docs)](https://docs.ansible.com/ansible/latest/user_guide/basic_concepts.html#inventory)).
* `secrets` - Secrets file (see: [Secrets](#secrets)).

The following files are OPTIONAL:

* `group_vars/web.yml`: variables specific to the environment.
  * `letsencrypt_enabled` - _bool_ - Set to `true` to automatically setup TLS certificates with LetsEncrypt.

Create a PR with these changes.

When everything is ready, provision the environment:

```bash
permacoop/ansible $ make ops-provision env="<ENV>"
```

This will install and setup required software on the server (Nginx, Certbot, git, Node, etc).

You can then [deploy](#deploying-an-environment).

### Secrets

Secret values in environments are managed with [Ansible Vault](https://docs.ansible.com/ansible/latest/user_guide/vault.html).

To modify the secrets file of an environment, use:

```bash
cd ansible && make secrets env="<ENV>"
```

The following secret values are **REQUIRED**:

* `file_encryption_key` - (Deprecated, use any value)
* `calendar_secret` - Calendar export secret token
* `db_host` - Database server hostname
* `db_port` - Database server port
* `db_username` - Database server username
* `db_password` - Database server password
* `db_name` - Database name

### Removing an environment

If an environment is not used anymore, it should be decommissioned to remove unused computing resources.

* Ensure the environment is not used anymore and it can be destroyed permanently.
* Open, review and merge a PR with the following changes:
  * Drop the corresponding environment directory in `ansible/environments`
  * Drop the environment from the environment list in this file.
* Drop the [computing resources](#computing-resources) allocated to the environment.

## Tools

### Testing on a Vagrant VM

You can test the Ansible setup on a local VM using Vagrant. This is useful to quickly iterate on changes to the Ansible setup.

First [install Vagrant](https://www.vagrantup.com/docs/installation), then start the VM:

```console
permacoop $ cd ansible
permacoop/ansible $ make vagrant CMD=up
```

Enter the VM with SSH. The following command also creates an SSH tunnel between your host machine and the VM for PostgreSQL and Nginx. This allows you to access the deployed service at http://localhost:3080, while allowing the deployed service to access the database on your host ([credit](https://stackoverflow.com/a/28506841)).

```console
permacoop/ansible $ vagrant ssh -- -R 5432:localhost:5432 -L 3080:localhost:80
```

Check with a `ping`:

```console
permacoop/ansible $ make ping env=vagrant
```

In a separate terminal, open SSH tunnels (database, deployed nginx):

```console
permacoop/ansible $ make vagrant-ssh
```

Provision the VM:

```console
permacoop/ansible $ make provision env=vagrant
```

Deploy:

```console
permacoop/ansible $ make deploy env=vagrant
```

Access the deployed service at http://localhost:3080.

You can define `git_version: "<some-branch>"` in `environments/vagrant/group_vars/web.yml` to deploy from a specific branch, e.g. from a PR branch.

## Troubleshooting

### `502 Bad Gateway` after a deploy

If the server responds with `502 Bad Gateway` after deploying, it means Nginx has trouble proxying the request to the client and/or the server.

You can investigate what's wrong in a few ways.

* Check Nginx status:

```bash
$ systemctl status nginx
```

* Check Supervisor status:

```bash
$ systemctl status supervisor
```

* Check process status for the API or the client:

```bash
$ sudo supervisorctl status api
$ sudo supervisorctl status client
```

* Inspect the deployed git commit:

```bash
$ cd ~/permacoop
$ git log
```

### Nginx is not starting up

Connect via SSH, then inspect Nginx traces:

```bash
$ nginx -t
```

### TLS certificates

**_(Advanced)_**

TLS certificates are stored by Certbot in `/etc/letsencrypt`.

Check the renewal cronjob:

```bash
crontab -l
```

The output must contain:

```
#Ansible: certs_renewal
@weekly certbot renew -q
```

To renew certificates manually:

1. Connect via SSH.
1. Revoke the existing certificate:

    ```
    certbot revoke --cert-name permacoop.fairness.coop
    ```

1. Deploy: a new certificate will be created and configured.

> **NOTE** : LetsEncrypt applies _rate limiting_ to certificate delivery. See: [Let's Encrypt: Rate Limits](https://letsencrypt.org/docs/rate-limits/).
