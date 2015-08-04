#!/bin/bash

set -e

npm install -g sequelize-cli
sequelize db:migrate --config config/config.js --env production
