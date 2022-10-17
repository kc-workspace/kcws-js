#!/usr/bin/env sh

# Support only yaml and markdown
outtype="markdown"
# Must be the same location as api-extractor docModel output
# @kcws/node-rig/profiles/default/config/api-extractor.json
input="common/temp/api"
# Documentation directory
output="docs"

api-documenter "$outtype" \
  --input-folder "$input" \
  --output-folder "$output"

git add "$output"

unset outtype input output
