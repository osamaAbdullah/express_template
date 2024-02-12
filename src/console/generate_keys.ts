import { storagePath } from "@config/app";
import crypto from 'crypto'
import fs from 'fs'

(function () {
    
    const dir = storagePath('keys')
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
    
    const keyPair = crypto.generateKeyPairSync('rsa', {
        
        modulusLength: 4096, // bits - standard for RSA keys
        publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Most common formatting choice
        },
        
        privateKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Most common formatting choice
        }
        
    });
    
    // Create the public key file
    fs.writeFileSync(dir + '/id_rsa_pub.pem', keyPair.publicKey);
    
    // Create the private key file
    fs.writeFileSync(dir + '/id_rsa_priv.pem', keyPair.privateKey);
    
})();
