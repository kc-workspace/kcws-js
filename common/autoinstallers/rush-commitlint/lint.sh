#!/usr/bin/env sh

root="$PWD"
autoinstallers="$(dirname "$0")"

cmd_name="${COMMITLINT_CMD:-commitlint}"

if ! test -f "$root/rush.json"; then
  echo "This script must be run from the root of a Rush monorepo." >&2
  exit 1
fi

cmd="$cmd_name"
if ! command -v "$cmd" >/dev/null 2>&1; then
  cmd="$autoinstallers/node_modules/.bin/$cmd_name"
fi

if ! command -v "$cmd" >/dev/null 2>&1; then
  printf "This script require autoinstaller dependencies (%s),
Please run 'rush %s %s' before execute this script." \
    "$cmd_name" \
    "update-autoinstaller" \
    "--name rush-commitlint" >&2
  exit 1
fi

config="$autoinstallers/commitlint.config.js"
code=0
if test -n "$CI" || test -n "$DEBUG"; then
  "$cmd" --config "$config" --verbose "$@"
  code=$?
else
  "$cmd" --config "$config" "$@"
  code=$?
fi

unset root autoinstallers cmd cmd_name
unset config

exit $code
