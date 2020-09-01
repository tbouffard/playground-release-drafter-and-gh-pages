const fs = require('fs');

const Asciidoctor = require('asciidoctor');

console.warn('called');

const asciidoctor = Asciidoctor()
const html = asciidoctor.convert(fs.readFileSync('docs/index.adoc'), {
  base_dir: 'docs',
  to_file: 'build/docs/index.html',
  standalone: true,
  mkdirs: true,
  attributes: { showtitle: true, icons: 'font' }
// to_dir
});



// var doc = asciidoctor.convertFile('/path/to/file.adoc', { to_file: true, standalone: true, mkdirs: true })
