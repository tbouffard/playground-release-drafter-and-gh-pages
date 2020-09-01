const fs = require('fs');
const fse = require('fs-extra')
const Asciidoctor = require('asciidoctor');
// const path = require('path');

const asciidoctor = Asciidoctor()
const html = asciidoctor.convert(fs.readFileSync('docs/index.adoc'), {
  base_dir: 'docs',
  to_file: '../build/docs/index.html',
  standalone: true,
  mkdirs: true,
  safe: 'unsafe', // needed because we want to generate the html outside of the directory that stores the sourc files
});

// cp -R ${doc_input}/architecture/images ${doc_output}/images
// cp -R ${doc_input}/images ${doc_output}

copyFileSync('docs/architecture/images', 'build/docs/images');
copyFileSync('docs/images', 'build/docs/images');



function copyFileSync(relPathToSourceFile, relPathToDestinationDirectory, destinationFileName) {
  // const directoryPath = -.join(__dirname, relPathToDestinationDirectory);
  fse.ensureDirSync(relPathToDestinationDirectory);
  // fs.mkdirSync(directoryPath, { recursive: true });
  fse.copySync(relPathToSourceFile, relPathToDestinationDirectory);
  // fs.copyFileSync(path.join(__dirname, relPathToSourceFile), directoryPath);
  // fs.copyFileSync(path.join(__dirname, relPathToSourceFile), path.join(directoryPath, destinationFileName));
}

