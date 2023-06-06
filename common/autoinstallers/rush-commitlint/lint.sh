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
  echo "This script require autoinstallers dependencies
Please run 'rush update-autoinstaller --name rush-commitlint' first." >&2
  exit 1
fi

config="$autoinstallers/commitlint.config.js"

if test -n "$CI" || test -n "$DEBUG"; then
  "$cmd" --config "$config" --verbose "$@" || exit $?
else
  "$cmd" --config "$config" "$@"
fi

unset root autoinstallers cmd cmd_name
unset config