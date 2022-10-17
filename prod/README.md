# prod

_This document describes Fairness' production deployment of Permacoop. It is meant for Fairness team members._

## Deployment

The current deployment process is manual. It is as follows.

1. Connect to the remote server via SSH.
1. `cd /var/www/permacoop`
1. Update client and server:

    ```
    git pull
    ```

1. Re-build apps:

    ```
    cd server && npm run build
    cd client/legacy && npm run build
    ```

1. Restart `pm2` if need be: if `pm2 status` shows an instance as `error`, restart it using:

    ```bash
    pm2 reload <INSTANCE_ID>
    ```

## Troubleshooting

### `502 Bad Gateway` after a deploy

If the server responds with `502 Bad Gateway` after deploying, it may be that the client and/or API servers failed to boot.

Restart `pm2`:

```bash
$ pwd
/var/www/permacoop
$ cd server && pm2 start server.config.js
$ cd client/legacy && pm2 start server.config.js
```
