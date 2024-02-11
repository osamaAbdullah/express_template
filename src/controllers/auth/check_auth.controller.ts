import { NextFunction, Request, Response } from "express";

export function user(req: Request, res: Response, next: NextFunction) {
    res.json(req.user)
}
