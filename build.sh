#!/bin/sh

# clean and prepare
rm -rf public
mkdir public

# compile jade to html
./node_modules/.bin/jade src -P
cd src
find . -name "*.html" | cpio -pdvm ../public
cd ..
rm -rf src/**/*.html
