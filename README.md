# playground-release-drafter-and-gh-pages
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftbouffard%2Fplayground-release-drafter-and-gh-pages.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftbouffard%2Fplayground-release-drafter-and-gh-pages?ref=badge_shield)


Playground for github pages, AsciDoctor, release-drafter actions, application deployment, and much more

Mainly investigations for [bpmn-visualization-js](https://github.com/process-analytics/bpmn-visualization-js)


## AsciiDoctor and GitHub Pages

### AsciiDoctor

AsciiDoctor sources are located in the [docs](docs)
They are used to generate the static site which is then pushed to the `gh-pages` branch
The site is hosted on https://tbouffard.github.io/playground-release-drafter-and-gh-pages/ 

#### Html Doc generation

It currently relies on `Docker`

From the root folder of the repository, run 
```bash
./build-doc.bash
```

### GitHub Pages

The AsciiDoctor sources are processed then pushed to the `gh-pages` by a [dedicated workflow](.github/workflows/gh-pages-publishing.yml)
This workflow
- uses the [GitHub Pages action](https://github.com/marketplace/actions/github-pages-action)
- commits are done by a dedicated bot user, not the github actions user
- only runs on documentation or workflow configuration changes to avoid extra rebuild when nothing changes.

**TODO**:
- tests the followings on publish gh action
    - publish_branch: gh-pages
    - commit_message: `${{ github.event.head_commit.message }}`
- setup a doc preview environment

Another workflow is also available to check build page status (**TODO**: to be fixed as it seems not running for now)

### Documentation preview

When documentation changes on Pull Request, the GitHub workflow attaches it as an artifact of the run job.

See [#21](https://github.com/tbouffard/playground-release-drafter-and-gh-pages/issues/21) to have a `Doc Preview environment`



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

This application is an adaptation of the VueJS quickstart to demonstrate deployment capabilities (see below)

Available resources
- Project setup :
```
npm install
```
- Compiles and hot-reloads for development
```
npm run serve
```
- Compiles and minifies for production
```
npm run build
```
- Lints and fixes files
```
npm run lint
```
- Customize configuration: see [Configuration Reference](https://cli.vuejs.org/config/).


## Application deployments

### Zeit Now

Deploy the `Playground Vue.js App` on commit
- Production: master branch, see https://playground-release-drafter-and-gh-pages-git-master.tbouffard.now.sh/
- Preview: other branches and PR with protection for forks (see https://zeit.co/docs/v2/git-integrations/zeit-now-for-github#deployment-authorizations-for-forks) 

See examples in https://github.com/zeit/now/tree/master/examples


#### Configuration

Done in both Now Dashboard and [now.json](./now.json) file

- use the GitHub integration : https://zeit.co/github and https://zeit.co/docs/v2/git-integrations/zeit-now-for-github
- deployment for every commit on every branch, update the GitHub deployment status and commit status on commit and PR.
See https://github.com/tbouffard/playground-release-drafter-and-gh-pages/deployments
- in this repo, the default commit status comment is disabled aka `github.silent` because it generates noise: the information are already
available in the git commit status, PR checks and gh deployment 
  - with message: commit f8fc893bb08bc335f33f339cd98a366664b77207 or [PR #9](https://github.com/tbouffard/playground-release-drafter-and-gh-pages/pull/9)
  - without message: f8fc893bb08bc335f33f339cd98a366664b77207

Available alternative to native GitHub integration (as of 2020-03-31)
https://github.com/marketplace/actions/zeit-now-deployment
- Let us control when/what to deploy (could be usefull for the `gh-pages` branch, see below)
- do not use GH Deployment, this should have to be managed manually
- more configuration than with the native integration 

**TODO**
- experiment `.nowignore`: for local dev only?
- check if the build configuration/command can be put in the `.nowconfig` file
- create a Now organization/team
- deployment diff: https://zeit.co/blog/deploy-summary

#### Managing the `gh-pages` branch

Currently (as of 2020-03-31), `ZEIT Now for GitHub will deploy every push by default`. As the usual Now build config
is an npm build, this does not work for the `gh-pages` which only contains static files.  
Filtering of branch to deploy: see https://github.com/zeit/now/discussions/4086 and https://github.com/zeit/now/discussions/4419


Workaround
Request `Now` to run a dedicated bash script [now-build.sh](./now-build.sh) which
- call the npm build on the `master` branch
- copy static resources in the [Now output directory](https://zeit.co/docs/v2/build-step#output-directory) to let Now then
deploy them
  - 1st implementation was to publish the gh-pages content, like for commit 9f398bd32230eb056e9ded301de6984f591a9ce3 and deployment https://playground-release-drafter-and-gh-pages-aet93vb1w.now.sh/
  - as of commit 016c036633b44fa9897db2ca1379e20fbe37b8a6, we only publish a html page that redirect to the github pages site: https://playground-release-drafter-and-gh-pages-gjs3sb48e.now.sh/
- such branch also be deployed on a custom Now domain (can be a subdomain of now.sh), see https://github.com/zeit/now/discussions/4454


#### Current caveats with `Now`

Based on `2020-03-31` experiments
- no way to filter which branch to build (see below for gh-pages) or only build PR. Generate issue if the build commands are not the same on all branches 
- require a lot of GitHub permissions, see https://vercel.com/docs/v2/git-integrations/vercel-for-github
- for organization repository, a paid account is needed (see https://github.com/zeit/now/discussions/4285), open source can be sponsored on demand


### Alternatives to be tested

- heroku: https://devcenter.heroku.com/articles/github-integration
- surge: https://surge.sh/ 
- render: https://render.com
- netlify: https://www.netlify.com/
  - used by the AsciiDoctor project
  - gh actions to publish PR: https://github.com/nwtgck/actions-netlify / https://github.com/netlify/actions


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

Projects using AsciiDoctor
  - gradle-docker-plugin
    - https://github.com/bmuschko/gradle-docker-plugin/tree/master/src/docs/asciidoc
    - publishing to github pages: https://bmuschko.github.io/gradle-docker-plugin/#gradle_git_publish
  


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftbouffard%2Fplayground-release-drafter-and-gh-pages.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftbouffard%2Fplayground-release-drafter-and-gh-pages?ref=badge_large)