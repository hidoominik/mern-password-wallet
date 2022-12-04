import chai from 'chai';
import helpers, { decrypt_AES } from '../controllers/helpers.js';
import CryptoJS from 'crypto-js';
import { assert } from 'chai';
//const helpers = require('../controllers/helpers.js')

var salt = helpers.generate_Salt();
var pepper = "Zq3t6w9z$C&F)J@N";
var key = "!A%D*G-KaPdSgVkY";

describe('From helpers.js file:', function(){
    describe('Encrypt and decrypt functions',function(){
        it("encryptAES_returnsEncryptedCode_ifGivenPasswordAndKey", function(){

            let result = helpers.encrypt_AES('password',key);
            assert.lengthOf(result.toString(), CryptoJS.AES.encrypt('password', CryptoJS.MD5(key).toString()).toString().length);

        }),


        it('calculateMD5_returnsMD5StringCode_ifGivenString', function(){
            let result = helpers.create_MD5_String('key');
            assert.equal(result, CryptoJS.MD5('key').toString());
        }),

        it('generateSalt_returnsSaltString_ifFunctionCalled', function(){
            let result = helpers.generate_Salt();
            assert.lengthOf(result, 32);
        })

        it('encryptSHA512_returnsEncryptedStringValue_ifGivenSaltPepperAndPassword', function(){
            
            let password = "password";
            let result = helpers.encrypt_SHA512_with_salt_and_pepper(pepper,salt, password);
            let expected = CryptoJS.SHA512(pepper+salt+password).toString();

            assert.equal(result, expected);
        }),
    
        it('encryptHmacSHA512_returnsEncryptedStringValue_ifGivenPasswordAndKey', function(){
            let result = helpers.encrypt_HmacSHA512_with_KEY('password', key);
            let expected = CryptoJS.HmacSHA512('password', key).toString();
            assert.equal(result, expected);
        })

        it('decryptAES_returnsDecryptedCode_ifGivenEncryptedPasswordAndKey', function(){
            let encrypted = CryptoJS.AES.encrypt('password', CryptoJS.MD5(key).toString());
            let result = helpers.decrypt_AES(encrypted, CryptoJS.MD5(key).toString());
           
            assert.equal(result, encrypted.toString(CryptoJS.enc.Utf8));
        })
        
    })
})