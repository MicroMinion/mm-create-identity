'use strict'

var nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')
var crypto = require('crypto')

nacl.setPRNG(function (x, n) {
  var i
  var v = crypto.randomBytes(n)
  for (i = 0; i < n; i++) x[i] = v[i]
  for (i = 0; i < v.length; i++) v[i] = 0
})

var createIdentity = function () {
  return createKeyPair().secretKey
}

var createKeyPair = function () {
  var keyPair = nacl.sign.keyPair()
  return {
    secretKey: nacl.util.encodeBase64(keyPair.secretKey),
    publicKey: nacl.util.encodeBase64(keyPair.publicKey)
  }
}

module.exports = {
  createIdentity: createIdentity,
  createKeyPair: createKeyPair
}