import { User } from "@models/user.model";
import { issueJWT } from "@utils/app.util";
import { createPassword } from "@utils/password.util";
import vine from "@vinejs/vine";
import { NextFunction, Request, Response } from "express";

export async function register(req: Request, res: Response, next: NextFunction) {
    
    const schema = vine.object({
        name: vine.string().minLength(3).maxLength(150),
        email: vine.string().email().minLength(3).maxLength(150),
        role: vine.string().in([ 'admin', 'readonly' ]),
        password: vine.string().minLength(8).maxLength(64).confirmed(),
    });
    
    const { name, email, role, password } = await vine.validate({ schema, data: { ...req.body } });
    
    const { salt, hash } = createPassword(password);
    
    const user = await User.create({ name, email, role, password: hash, salt });
    
    const { token, expiresIn } = await issueJWT(user);
    
    res.status(201).json({ user, token, expiresIn });
}
