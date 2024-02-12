import { NextFunction, Request, Response } from "express";

export function login(req: Request, res: Response, next: NextFunction) {
    res.json({ user: req.user })
}
