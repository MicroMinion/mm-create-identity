#!/bin/sh

#TODO: Install docker?

npm install -g tweetnacl &&
npm install -g tweetnacl-util &&
cp scripts/create-identity /usr/local/bin
