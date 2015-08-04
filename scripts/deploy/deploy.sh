#!/bin/bash

set -e

BUILD_DIR=`pwd`

GCLOUD=$HOME/gcloud/google-cloud-sdk/bin

printf 'y\n' | $GCLOUD/gcloud components update app
$GCLOUD/gcloud config set project dor-web
$GCLOUD/gcloud auth activate-service-account --key-file credentials/dor-web.json
$GCLOUD/gcloud preview app deploy app.yaml --quiet --set-default --version `node scripts/deploy/get_version_number.js`
