#!/usr/bin/env sh

root="$PWD"
autoinstallers="$(dirname "$0")"

cmd_name="${LINT_STAGED_CMD:-lint-staged}"

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
Please run 'rush update-autoinstaller --name rush-lintstaged' first." >&2
  exit 1
fi

if test -n "$CI"; then
  # Mute output in CI
  "$cmd" --cwd "$root" --quiet || exit $?
elif test -n "$DEBUG"; then
  "$cmd" --cwd "$root" --debug --verbose || exit $?
else
  "$cmd" --cwd "$root" || exit $?
fi

unset root autoinstallers cmd cmd_name
