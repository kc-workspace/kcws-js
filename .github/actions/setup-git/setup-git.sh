#!/usr/bin/env bash

email="${GIT_EMAIL:?}"
name="${GIT_USERNAME:?}"

git config user.email "$email"
git config user.name "$name"
git config push.autoSetupRemote true

unset email name
