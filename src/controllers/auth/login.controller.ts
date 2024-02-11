import { User } from "@models/user.model";
import { issueJWT } from "@utils/app.util";
import { validatePassword } from "@utils/password.util";
import vine from '@vinejs/vine';
import { NextFunction, Request, Response } from 'express';

export async function login(req: Request, res: Response, next: NextFunction) {
    
    const schema = vine.object({
        email: vine.string().email(),
        password: vine
            .string()
            .minLength(8)
            .maxLength(32)
    });
    
    const { email, password } = await vine.validate({ schema, data: { ...req.body } });
    
    const user = await User.findOne({ where: { email } });
    
    if (!user || !validatePassword(password, user.password, user.salt)) {
        return res.status(401).json({ message: 'credentials does not match our records!' });
    }
    
    const { token, expiresIn } = await issueJWT(user);
    
    res.status(200).json({ user, token, expiresIn });
    
}
