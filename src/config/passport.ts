import passport from "passport";
import passportLocal from "passport-local";
import {User} from "@models/user.model";

export default (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new passportLocal.Strategy({usernameField: 'email'},
            async (username, password, callback) => {

                const user = await User.findOne({where: {email: username}});

                return callback(undefined, user)

                // User.findOne({ email: email.toLowerCase() }, (err: NativeError, user: UserDocument) => {
                //     if (err) { return done(err); }
                //     if (!user) {
                //         return done(undefined, false, { message: `Email ${email} not found.` });
                //     }
                //     user.comparePassword(password, (err: Error, isMatch: boolean) => {
                //         if (err) { return done(err); }
                //         if (isMatch) {
                //             return done(undefined, user);
                //         }
                //         return done(undefined, false, { message: "Invalid email or password." });
                //     });
                // });

            }));

    passport.serializeUser( (user: User, callback) => {
        callback(null, user.id);
    });

    passport.deserializeUser(async (id, callback) => {
        const user = await User.findByPk(id);
        callback(null, user)
    });

}


