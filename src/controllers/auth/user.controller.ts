import { NextFunction, Request, Response } from "express";

export function user(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        res.json({ user: req.user })
    } else {
        res.status(401).json({ message: 'Unauthenticated!' })
    }
}
