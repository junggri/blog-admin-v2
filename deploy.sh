#!/bin/zsh

rm -rf build
echo "build start"
yarn build
aws s3 sync --cache-control 'no-cache' ./build s3://admin.junggri.com