#!/usr/bin/env sh

# current work directory
CWD="$(dirname "$0")"

typedoc --options "$CWD/typedoc.json"

unset CWD
