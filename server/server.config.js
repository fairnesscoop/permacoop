// Production pm2 configuration
// See: https://pm2.keymetrics.io/docs/usage/application-declaration/
module.exports = {
  apps: [
    {
      name: 'Permacoop API',
      script: './dist/src/main.js',
      instances: 2,
      exec_mode: 'cluster',
      watch: true,
      env: {
        NODE_ENV: 'production',
        PORT: '3000'
      }
    }
  ]
};
