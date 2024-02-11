import { storagePath } from "@config/app";
import { readFile } from "fs/promises";
import jwt from 'jsonwebtoken';

export async function issueJWT(user) {
    
    const expiresIn = '1d';
    
    const payload = {
        sub: user.id,
        iat: Date.now()
    };
    
    const privateKey = await readFile(storagePath('keys/id_rsa_priv.pem'), { encoding: 'utf-8' });
    
    const signedToken = jwt.sign(payload, privateKey, { expiresIn, algorithm: 'RS256' });
    
    return {
        token: "Bearer " + signedToken,
        expiresIn
    }
    
}
