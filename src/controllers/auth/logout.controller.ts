import { NextFunction, Request, Response } from "express";

export async function logout(req: Request, res: Response, next: NextFunction) {
    req.logout((err) => {
        if (err) return next(err);
        res.json({ message: 'You have successfully logout!' })
    });
}
