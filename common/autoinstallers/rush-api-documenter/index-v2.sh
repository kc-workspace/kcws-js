#!/usr/bin/env sh

set -e

# current work directory
CWD="$(dirname "$0")"

typedoc --options "$CWD/typedoc.json"

unset CWD
