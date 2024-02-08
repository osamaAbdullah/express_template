import {NextFunction, Request, Response} from "express";
import passport from "passport";

export function login(req : Request, res : Response, next : NextFunction) {

    // TODO validate the inputs

    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })(req, res, next);

    // (err: Error, user: UserDocument, info: IVerifyOptions) => {
    //     if (err) { return next(err); }
    //     if (!user) {
    //         req.flash("errors", {msg: info.message});
    //         return res.redirect("/login");
    //     }
    //     req.logIn(user, (err) => {
    //         if (err) { return next(err); }
    //         req.flash("success", { msg: "Success! You are logged in." });
    //         res.redirect(req.session.returnTo || "/");
    //     });
    // }

}
