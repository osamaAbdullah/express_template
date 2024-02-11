import { storagePath } from "@config/app";
import { User } from "@models/user.model";
import { readFile } from "fs/promises";
import passport from "passport";
import passportJWT from "passport-jwt";

export default async (app) => {
    
    app.use(passport.initialize());
    
    passport.use(new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: await readFile(storagePath('/keys/id_rsa_pub.pem'), { encoding: "utf-8" }),
        algorithms: [ 'RS256' ]
    }, async function ({ sub }, done) {
        
        const user = await User.findByPk(sub);
        
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
        
    }));
    
}
