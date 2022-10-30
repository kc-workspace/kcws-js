#!/usr/bin/env bash

fingerprint="${GPG_FINGERPRINT}"

if test -n "$fingerprint"; then
  gpg --batch --yes --delete-secret-key "$fingerprint"
  gpg --batch --yes --delete-key "$fingerprint"
fi

unset fingerprint
