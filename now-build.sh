#!/usr/bin/env bash
set -euo pipefail

# Hack for the Now GitHub integration
# Currently (2020-03-29) there is no way to filter branch used to deploy: all branches are deployed
# This is an issue for the 'gh-pages' branch which has no package.json
# So use a dedicated bash script in 'master' to run npm and in 'gh-pages' to only copy static content
rm -rf dist/
mkdir -p dist/

redirectorFile=dist/index.html
touch ${redirectorFile}

cat > ${redirectorFile} << EOL
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Refresh" content="0; https://tbouffard.github.io/playground-release-drafter-and-gh-pages/" />
  </head>
  <body>
    <p>Please follow <a href="https://tbouffard.github.io/playground-release-drafter-and-gh-pages/">this link</a>.</p>
  </body>
</html>
EOL

