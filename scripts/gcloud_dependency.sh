#!/bin/bash

installGCloud() {
    # Set this, so we can easily get back to it
    BUILD_DIR=`pwd`

    if [ ! -d $HOME/gcloud/google-cloud-sdk ]; then
        mkdir -p $HOME/gcloud &&
        wget https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz --directory-prefix=$HOME/gcloud &&
        cd $HOME/gcloud &&
        tar xzf google-cloud-sdk.tar.gz &&
        printf '\ny\n\ny\ny\n' | ./google-cloud-sdk/install.sh &&
        printf 'Y\n' | $HOME/gcloud/google-cloud-sdk/bin/gcloud components update &&
        cd $BUILD_DIR;
    fi
}

installGCloud
