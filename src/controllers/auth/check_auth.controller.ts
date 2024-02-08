import {NextFunction, Request, Response} from "express";

export function check_auth(req : Request, res : Response, next : NextFunction) {
    if (req.isAuthenticated()) {
        res.json(req.user)
    }
    else {
        res.status(401).json({message: 'Unauthenticated!'})
    }
}
