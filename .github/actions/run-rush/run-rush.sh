#!/usr/bin/env bash

cmd="${1:?}"
shift 1

__shell=""
__cmd="rush"
__args=()

for arg in "$@"; do
  # add argument if and only if it isn't a empty string
  if test -n "$arg"; then
    __args+=("$arg")
  fi
done

if ! command -v "$__cmd" >/dev/null 2>&1; then
  __shell="node"
  __cmd="common/scripts/install-run-rush.js"
fi

if test -n "$__shell"; then
  echo "Use install-run-rush.sh"
  # shellcheck disable=SC2086
  "$__shell" "$__cmd" "$cmd" "${__args[@]}" || exit 1
else
  echo "Use rush"
  # shellcheck disable=SC2086
  "$__cmd" "$cmd" "${__args[@]}" || exit 1
fi

unset cmd __shell __cmd __args
