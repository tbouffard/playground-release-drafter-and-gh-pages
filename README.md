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
Another workflow is also available to check build page status (TODO: to be fixed as it seems not running for now)



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
  
