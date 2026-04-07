#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "docker" --dbname "permacoop" <<-EOSQL
    CREATE ROLE permacoop WITH LOGIN PASSWORD 'permacoop' CREATEDB;
EOSQL
