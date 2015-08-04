#!/bin/bash

# Decrypt all *.json.enc files
for f in credentials/*.json.enc; do
    # Remove .enc (http://stackoverflow.com/questions/125281/how-do-i-remove-the-file-suffix-and-path-portion-from-a-path-string-in-bash)
    f_json=${f%.enc};
    echo Decrypting $f "->" $f_json;
    openssl aes-256-cbc -k "$JSON_ENCRYPTION_KEY" -in $f -d -a -out $f_json
done

# Decrypt all ssl certs in credentials/ssl/
for f in credentials/ssl/*.pem.enc; do
    f_pem=${f%.enc};
    echo Decrypting $f "->" $f_pem;
    openssl aes-256-cbc -k "$JSON_ENCRYPTION_KEY" -in $f -d -a -out $f_pem
done

# Decrypt all encoded config files
for f in config/*.js.enc; do
    f_js=${f%.enc};
    echo Decrypting $f "->" $f_js;
    openssl aes-256-cbc -k "$JSON_ENCRYPTION_KEY" -in $f -d -a -out $f_js
done

