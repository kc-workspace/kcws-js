#!/usr/bin/env bash

cmd="${COMMAND:?}"

__shell=""
__cmd="rush"

if ! command -v "$__cmd" >/dev/null 2>&1; then
  __shell="node"
  __cmd="common/scripts/install-run-rush.js"
fi

if test -n "$__shell"; then
  echo "Use install-run-rush.sh"
  # shellcheck disable=SC2086
  "$__shell" "$__cmd" "$cmd" $ARGS || exit 1
else
  echo "Use rush"
  # shellcheck disable=SC2086
  "$__cmd" "$cmd" $ARGS || exit 1
fi

unset cmd __shell __cmd
