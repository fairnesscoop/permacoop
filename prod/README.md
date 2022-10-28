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

| Name | Description            | URL                             | Deploy branch |
|------|------------------------|---------------------------------|---------------|
| prod | Production environment | https://permacoop.fairness.coop | `master`      |

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

You can test the Ansible setup on a local VM using [Vagrant](https://www.vagrantup.com/docs/installation). This is useful to quickly iterate on changes to the Ansible setup.

Create a Vagrant box with the following configuration:

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Configure VM
  config.vm.box = "debian/bullseye64"
  config.vm.network "private_network", ip: "192.168.56.11"
  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 1
  end

  # Share host SSH public key with VM, so Ansible can execute commands over SSH.
  config.ssh.insert_key = false
  config.vm.provision "shell" do |s|
    ssh_pub_key = File.readlines("#{Dir.home}/.ssh/id_rsa.pub").first.strip
    s.inline = <<-SHELL
    echo #{ssh_pub_key} >> /home/vagrant/.ssh/authorized_keys
    echo #{ssh_pub_key} >> /root/.ssh/authorized_keys
    SHELL
  end
end
```

Start the VM:

```bash
vagrant up
```

Enter the VM with SSH. The following command also creates an SSH tunnel between your host machine and the VM for PostgreSQL and Nginx. This allows you to access the deployed service at http://localhost:3080, while allowing the deployed service to access the database on your host ([credit](https://stackoverflow.com/a/28506841)).

```bash
vagrant ssh -- -R 5432:localhost:5432 -L 3080:localhost:80
```

[Create an environment](#adding-an-environment) named `test` (this environment is ignored by git):

- `hosts` :

    ```
    cd server && npm run build
    cd client/legacy && npm run build
    ```

- `group_vars/web.yml` :

    _Edit as necessary_

    ```yaml
    db_host: localhost
    db_port: 5432
    db_username: docker
    db_password: docker
    db_name: permacoop
    ```

Check the configuration with a `ping`:

```bash
permacoop/ansible $ make ping env=test
```

Then provision the environment into the VM:

```bash
permacoop/ansible $ make provision env=test
```

Deploy:

```bash
permacoop/ansible $ make deploy env=test
```

Access the deployed service at http://localhost:3080.

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
