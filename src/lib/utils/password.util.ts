import crypto from "crypto";

export function createPassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash
    };
}

export function validatePassword(password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}