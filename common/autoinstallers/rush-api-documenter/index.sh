#!/usr/bin/env sh

set -e

# Support only yaml and markdown
outtype="markdown"
# Must be the same location as api-extractor docModel output
# @kcws/node-rig/profiles/default/config/api-extractor.json
input="common/temp/api"
# Temporarily documentation directory
temp_output="_docs"

api-documenter "$outtype" \
  --input-folder "$input" \
  --output-folder "$temp_output"

unset outtype input temp_output
