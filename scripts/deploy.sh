#!/bin/bash

set -e

scripts/decrypt_credentials.sh
scripts/deploy/deploy.sh
scripts/migrations/ci_run_migration.sh
