'use strict'

var nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')
var crypto = require('crypto')
var qrImage = require('qr-image')
var fs = require('fs')

nacl.setPRNG(function (x, n) {
  var i
  var v = crypto.randomBytes(n)
  for (i = 0; i < n; i++) x[i] = v[i]
  for (i = 0; i < v.length; i++) v[i] = 0
})

var createIdentity = function () {
  return createKeyPair().secretKey
}

var createSecret = function () {
  return nacl.util.encodeBase64(nacl.randomBytes(100))
}

var createShortSecret = function () {
  var text = ''
  var possible = '0123456789'
  for (var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

var createKeyPair = function () {
  var keyPair = nacl.sign.keyPair()
  return {
    secretKey: nacl.util.encodeBase64(keyPair.secretKey),
    publicKey: nacl.util.encodeBase64(keyPair.publicKey)
  }
}

var createQrImageWithSecret = function (publicKey, secret, destination) {
  var qrCodeText = JSON.stringify({
    publicKey: publicKey,
    secret: secret
  })
  var buffer = qrImage.image(qrCodeText, {
    type: 'png',
    margin: 1
  })
  buffer.pipe(fs.createWriteStream(destination))
}

module.exports = {
  createIdentity: createIdentity,
  createKeyPair: createKeyPair,
  createShortSecret: createShortSecret,
  createSecret: createSecret,
  createQrImageWithSecret: createQrImageWithSecret
}
