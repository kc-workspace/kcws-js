#!/usr/bin/env sh

set -e # Exit if error occurred

export DOCKER_CONTAINER_NAME="kcws-docs"
export DOCKER_IMAGE="ghcr.io/actions/jekyll-build-pages:v1.0.6"
export GITHUB_WORKSPACE="/home"
export INPUT_SOURCE="_docs"
export INPUT_DESTINATION="_site"

export INPUT_VERBOSE="false"
export INPUT_TOKEN="${GITHUB_TOKEN:-$1}"
export GITHUB_REPOSITORY="kc-workspace/kcws-js"
export INPUT_BUILD_REVISION="abc"

# build document website
docker run --rm -it \
  -e "GITHUB_WORKSPACE" -e "INPUT_SOURCE" -e "INPUT_DESTINATION" \
  -e "INPUT_VERBOSE" -e "INPUT_BUILD_REVISION" \
  -e "GITHUB_REPOSITORY" -e "INPUT_TOKEN" \
  --volume="$PWD:$GITHUB_WORKSPACE" \
  --name "$DOCKER_CONTAINER_NAME" \
  "$DOCKER_IMAGE"
