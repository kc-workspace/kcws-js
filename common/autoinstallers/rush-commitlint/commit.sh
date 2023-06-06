#!/usr/bin/env sh

root="$PWD"
autoinstallers="$(dirname "$0")"

cmd_name="${COMMITIZEN_CMD:-git-cz}"

## commitizen must run on autoinstallers location
cd "$autoinstallers" || exit $?

if ! test -f "$PWD/package.json"; then
  echo "This script must be run from autoinstaller location." >&2
  exit 1
fi

cmd="$cmd_name"
if ! command -v "$cmd" >/dev/null 2>&1; then
  cmd="$autoinstallers/node_modules/.bin/$cmd_name"
fi

echo "$cmd"
if ! command -v "$cmd" >/dev/null 2>&1; then
  echo "This script require autoinstallers dependencies
Please run 'rush update-autoinstaller --name rush-commitlint' first." >&2
  exit 1
fi

"$cmd" "$@" || exit $?

unset root autoinstallers cmd cmd_name
unset config
