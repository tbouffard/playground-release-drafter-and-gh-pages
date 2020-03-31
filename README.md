# playground-release-drafter-and-gh-pages
Playground for github pages, AsciDoctor and release-drafter actions



## AsciiDoctor and GitHub Pages

### AsciiDoctor

AsciiDoctor sources are located in the [docs](docs)
They are used to generate the static site which is then pushed to the `gh-pages` branch
The site is hosted on https://tbouffard.github.io/playground-release-drafter-and-gh-pages/ 

Doc generation
```
docker run -v "$(pwd)/docs:/documents/" -v "$(pwd)/docs-generated:/documents-generated/" --name asciidoc-to-html \
asciidoctor/docker-asciidoctor  asciidoctor -D /documents-generated index.adoc
```

### GitHub Pages

The asciidoctor sources are processed then pushed to the `gh-pages` by a [dedicated workflow](.github/workflows/gh-pages-publishing.yml)
This workflow only runs on documentation or workflow configuration changes to avoid extra rebuild when nothing changes.
 
Another workflow is also available to check build page status (**TODO**: to be fixed as it seems not running for now)


## Release-Drafter

Q&A (info based on the `GitHub Action` usage)
- can I update the draft release manually (for instance, overview in the top of the content): **NO**, or at least not found how to do
- is the release content is rebuilt on each run: **YES**, tested by removing the whole content manually or by activating the
action after some PR have already been merged
- categories from label - **not found how to or if this can be configured**
  - require several labels to be added in a category
  - exclude labels combinaison: for instance, PR marked as `enhancement` and `documentation` only referenced in the `enhancement`
  category and not in the `documentation`


## Playground Vue.js App

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Resources

- https://github.com/release-drafter/release-drafter
- asciidoctor
  - https://asciidoctor.org/docs/user-manual/
    - TOC: https://asciidoctor.org/docs/user-manual/#user-toc
  - https://github.com/asciidoctor/docker-asciidoctor
  - http://mgreau.com/posts/2016/03/28/asciidoc-to-gh-pages-with-travis-ci-docker-asciidoctor.html
  - https://github.com/asciidoctor/jekyll-asciidoc
- Push to github pages
  - https://github.com/peaceiris/actions-gh-pages
  
Curated list of GitHub Actions: https://github.com/sdras/awesome-actions

Projects using ascidoctor
  - gradle-docker-plugin
    - https://github.com/bmuschko/gradle-docker-plugin/tree/master/src/docs/asciidoc
    - publishing to github pages: https://bmuschko.github.io/gradle-docker-plugin/#gradle_git_publish
  
