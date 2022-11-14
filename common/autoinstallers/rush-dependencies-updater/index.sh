#!/usr/bin/env sh

root="$PWD"
autoinstallers="$(dirname "$0")"

cmd_name="${COMMAND_NAME:-ncu}"

if ! test -f "$root/rush.json"; then
  echo "This script must be run from the root of a Rush monorepo." >&2
  exit 1
fi

cmd="$cmd_name"
if ! command -v "$cmd" >/dev/null 2>&1; then
  cmd="$autoinstallers/node_modules/.bin/$cmd_name"
fi

if ! command -v "$cmd" >/dev/null 2>&1; then
  echo "This script require autoinstallers dependencies,
Please run 'rush update-autoinstallers' first." >&2
  exit 1
fi

pkg="package.json"
config="$autoinstallers/.ncurc.yml"
tmp="$(mktemp)"

find "$root" \
  -type f \
  -name "$pkg" \
  -and -not -path "*node_modules*" \
  -and -not -path "*temp*" >"$tmp"
while IFS= read -r pjson <&3; do
  "$cmd" \
    --packageFile "$pjson" \
    --configFilePath "$root" \
    --configFileName "$config" \
    "$@"
done 3<"$tmp"

rm "$tmp"
unset tmp root autoinstallers cmd cmd_name pjson config
