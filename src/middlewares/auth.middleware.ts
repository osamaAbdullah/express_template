import { NextFunction, Request, Response } from "express";
import passport from "passport";

export function protect(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false })(req, res, next)
}
