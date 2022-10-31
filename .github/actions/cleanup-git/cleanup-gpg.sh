#!/usr/bin/env bash

fingerprint="${GPG_FINGERPRINT:?}"

gpg --batch --yes --delete-secret-key "$fingerprint"
gpg --batch --yes --delete-key "$fingerprint"

unset fingerprint
