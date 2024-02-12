import { customAuthenticate } from "@config/passport";
import { NextFunction, Request, Response } from "express";

export function login(req: Request, res: Response, next: NextFunction) {
    customAuthenticate(req, res, next);
}
