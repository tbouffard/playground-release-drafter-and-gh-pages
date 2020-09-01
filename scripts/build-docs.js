const fs = require('fs');
const fse = require('fs-extra')
const Asciidoctor = require('asciidoctor');

// clean existing docs
fse.removeSync('build/docs');

// build html docs
const asciidoctor = Asciidoctor()
const html = asciidoctor.convert(fs.readFileSync('docs/index.adoc'), {
  base_dir: 'docs',
  to_file: '../build/docs/index.html',
  standalone: true,
  mkdirs: true,
  safe: 'unsafe', // needed because we want to generate the html outside of the directory that stores the source files
});

// copy images
fse.ensureDirSync('build/docs/images');

fse.copySync('docs/architecture/images', 'build/docs/images');
fse.copySync('docs/images', 'build/docs/images');
