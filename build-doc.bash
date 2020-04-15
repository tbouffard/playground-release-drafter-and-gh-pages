#!/usr/bin/env bash
set -e

echo "Building html documentation with Docker"

doc_input="$(pwd)/docs"
doc_output="$(pwd)/docs-generated"
rm -rf ${doc_output}
mkdir -p ${doc_output}

docker run --rm -v "${doc_input}:/documents/" -v "${doc_output}:/documents-generated/" \
    --name bpmn-visu-js-asciidoc \
    asciidoctor/docker-asciidoctor:1.1.0 \
    asciidoctor -D /documents-generated index.adoc

# TODO be more generic
cp -R ${doc_input}/architecture/images ${doc_output}/images
cp -R ${doc_input}/images ${doc_output}

echo "Documentation is now available in ${doc_output}"