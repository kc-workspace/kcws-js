#!/usr/bin/env bash

email="${GIT_EMAIL:?}"
name="${GIT_USERNAME:?}"

git config user.email "$email"
git config user.name "$name"

unset email name
