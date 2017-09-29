'use strict'
const crypto = require('crypto');
const fs = require('fs');
let cipher = crypto.createCipher('aes192', '77cb54b4-6f08-429d-a558-add6cc8599e8');
let decipher = crypto.createDecipher('aes192', '77cb54b4-6f08-429d-a558-add6cc8599e8');

let encrypted = cipher.update('this is plain string to encrypt', 'utf8', 'hex');
encrypted += cipher.final('hex');
let plain = decipher.update(encrypted, 'hex', 'utf8')
plain += decipher.final('utf8');
console.log(encrypted)
console.log('the plain', plain);


// https://nodejs.org/api/crypto.html#crypto_class_cipher
cipher = crypto.createCipher('aes192', '168ecb5e-841c-4b77-8edd-0297b74ecb06');
decipher = crypto.createDecipher('aes192', '168ecb5e-841c-4b77-8edd-0297b74ecb06');
const input = fs.createReadStream('./privatekey.pem');
let output = fs.createWriteStream('./privtekeytest.pem');
input.pipe(cipher).pipe(output);

const decryptfile = fs.createWriteStream('./e411.pem');
input.on('end', () => {
  output = fs.createReadStream('./privtekeytest.pem')
  output.pipe(decipher).pipe(decryptfile);
});


// RSA public/private encryption
// https://nodejs.org/api/crypto.html#crypto_crypto_publicdecrypt_publickey_buffer
var path = require("path");

var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve('./publickey.pem');
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toEncrypt);
    encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve('./privatekey.pem');
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

// encrypted = encryptStringWithRsaPublicKey('4217b732-47ca-469a-a24e-e626cce0eaa4');
// console.log(encrypted);
//
// let decrypt = decryptStringWithRsaPrivateKey('qP5YETKSSlOjkFre0qGoE6Ux6oZOkH49fEEeKXrXHwO3prLlyrS/LJVRdAAUCIIfq+YPPZ22RhuNwjqVWFVGUH1N9dqQFLVCe8NL169q0V/bJ+ghckwiEzdM7GXwUPBFD7nNFkt4rw+Du+8tb21Vn3/uZD3ngV0Tr0clJSHX9lFAL7w8X7xUNA9Y35h1/oK7iACXfEOhUQke8PTAO6mvXlph9uFTplPZ5PvWTGLQMzYUJtJw5pMeN4O+WEp4spldYVbJHd2ngHCdixqdGTpfhH3V9AV33O2M2XjkwfXtLF2JdawAJE+BRJspHkoPR9ztZjG0tS4rFJ8BA/u5Ej5H/A==');
// console.log(decrypt);
