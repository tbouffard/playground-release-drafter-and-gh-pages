#!/usr/bin/env bash
set -euo pipefail

# Hack for the Now GitHub integration
# Currently (2020-03-29) there is no way to filter branch used to deploy: all branches are deployed
# This is an issue for the 'gh-pages' branch which has no package.json
# So use a dedicated bash script in 'master' to run npm and in 'gh-pages' to only copy static content
npm run build
