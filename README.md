# playground-release-drafter-and-gh-pages
Playground for github pages, AsciDoctor and release-drafter actions

AsciiDoctor sources are located in the [docs](docs)
They are used to generate the static site which is then pushed to the `gh-pages` branch
The site is hosted on https://tbouffard.github.io/playground-release-drafter-and-gh-pages/ 


Doc generation
```
docker run -v "$(pwd)/docs:/documents/" -v "$(pwd)/docs-generated:/documents-generated/" --name asciidoc-to-html \
asciidoctor/docker-asciidoctor  asciidoctor -D /documents-generated index.adoc
```


## Resources

- https://github.com/release-drafter/release-drafter
- asciidoctor
  - https://github.com/asciidoctor/docker-asciidoctor
- Push to github pages
  - https://github.com/peaceiris/actions-gh-pages
