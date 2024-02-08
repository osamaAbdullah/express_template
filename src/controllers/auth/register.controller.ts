import {NextFunction, Request, Response} from "express";
import {createPassword} from "@utils/password.util";
import {User} from "@models/user.model";

export async function register(req: Request, res: Response, next: NextFunction) {

    const {name, email, password, role, password_confirmation} = req.body;

    // TODO validate the inputs

    const {salt, hash} = createPassword(password);

    const user = await User.create({name, email, role, password: hash, salt});

    res.status(201).json({user});
}
