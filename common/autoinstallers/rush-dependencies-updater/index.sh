#!/usr/bin/env sh

root="$PWD"
autoinstallers="$(dirname "$0")"

cmd_name="ncu"
config=".ncurc.yml"

if ! test -f "$root/rush.json"; then
  echo "This script must be run from the root of a Rush monorepo." >&2
  exit 1
fi

cmd="$cmd_name"
if ! command -v "$cmd" >/dev/null 2>&1; then
  cmd="$autoinstallers/node_modules/.bin/$cmd_name"
fi

if ! command -v "$cmd" >/dev/null 2>&1; then
  echo "This script require autoinstallers dependencies, please run 'rush update-autoinstallers' first." >&2
  exit 1
fi

find "$root" \
  -type f \
  -name package.json \
  -and -not -path "*node_modules*" \
  -and -not -path "*temp*" |
  while IFS= read -r pjson; do
    "$cmd" \
      --packageFile "$pjson" \
      --configFilePath "$root" \
      --configFileName "$config" \
      "$@"
  done

unset root autoinstallers cmd cmd_name pjson config
