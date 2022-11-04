#!/usr/bin/env bash

branch_prefix="$1"
output="$2"

printf "name=%s/%s\n" \
  "$branch_prefix" \
  "$(date +'%Y-%m-%d')" >>"$output"

unset branch_prefix output
