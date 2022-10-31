#!/usr/bin/env bash

title="${PULL_REQUEST_TITLE:?}"
body="$PULL_REQUEST_BODY"

printf "%s" "url=" >>"$GITHUB_OUTPUT"
gh pr create \
  --title "$title" \
  --body "$body" >>"$GITHUB_OUTPUT"

unset title body
