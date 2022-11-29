#!/usr/bin/env sh

name="@kcws/js"
output="_site"
readme="none"
plugin_name="@mxssfd/typedoc-theme"
theme_name="my-theme"
light_theme="solarized-light"
dark_theme="solarized-dark"

# Verbose, Info, Warn, Error
log_level="Warn"

typedoc \
  --emit "docs" \
  --out "$output" \
  --logLevel "$log_level" \
  --exclude "**/*+(index|.spec|.e2e).ts" \
  --sort "visibility" --sort "static-first" \
  --sort "enum-value-ascending" --sort "alphabetical" \
  --plugin "$plugin_name" --theme "$theme_name" \
  --lightHighlightTheme "$light_theme" \
  --darkHighlightTheme "$dark_theme" \
  --gaID "" --readme "$readme" \
  --githubPages --cleanOutputDir --includeVersion \
  --validation.invalidLink --validation.notExported \
  --name "$name" \
  --entryPointStrategy "packages" \
  "packages/*" "typings/*"

unset name output log_level readme light_theme dark_theme
