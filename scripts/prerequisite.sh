#!/usr/bin/env bash

exit_code=0

require_mode="Required"
optional_mode="Optional"

checking() {
  local name="$1" mode="$2" link="$3"

  printf "Checking %-15s: " "$name"
  if command -v "$name" >/dev/null 2>&1; then
    printf "%s\n" "passed"
  else
    printf "%s (%s)\n" "failed" "$link"
    if [ "$mode" = "$require_mode" ]; then
      ((exit_code++))
    fi
  fi
}

completed() {
  return "$exit_code"
}

checking "node" "$require_mode" "https://nodejs.org/en/download/package-manager"

checking "rush" "$require_mode" "https://rushjs.io/pages/intro/get_started"

checking "shellcheck" "$optional_mode" "https://github.com/koalaman/shellcheck"

checking "yamllint" "$optional_mode" "https://yamllint.readthedocs.io/en/stable/quickstart.html"

completed
