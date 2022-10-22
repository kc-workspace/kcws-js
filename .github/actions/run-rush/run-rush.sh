#!/usr/bin/env bash

cmd="${COMMAND:?}"
# shellcheck disable=SC2206
args=($ARGS)

__shell=""
__cmd="rush"

if ! command -v "$__cmd" >/dev/null 2>&1; then
  __shell="node"
  __cmd="common/scripts/install-run-rush.js"
fi

if test -n "$__shell"; then
  echo "Use install-run-rush.sh"
  "$__shell" "$__cmd" "$cmd" "${args[@]}" || exit 1
else
  echo "Use rush"
  "$__cmd" "$cmd" "${args[@]}" || exit 1
fi

unset cmd args __shell __cmd
