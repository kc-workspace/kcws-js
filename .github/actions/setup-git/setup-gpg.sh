#!/usr/bin/env bash

private_key="${GPG_PRIVATE_KEY_BASE64:?}"
fingerprint="${GPG_FINGERPRINT:?}"

# Import private key to gpg
echo "$private_key" |
  base64 --decode |
  gpg --batch --allow-secret-key-import --import

# Import signing key to git
git config user.signingKey "$fingerprint"

unset private_key fingerprint
