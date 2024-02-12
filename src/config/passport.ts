import { User } from "@models/user.model";
import { validatePassword } from "@utils/password.util";
import vine from '@vinejs/vine';
import passport from "passport";
import passportLocal from "passport-local";

export default (app) => {
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(
        new passportLocal.Strategy({ usernameField: 'email', passwordField: 'password' },
            async (email, password, callback) => {
              
                const schema = vine.object({
                    email: vine.string().email(),
                    password: vine
                        .string()
                        .minLength(8)
                        .maxLength(32)
                });
                
                await vine.validate({ schema, data: { email, password } });
                
                const user = await User.findOne({ where: { email } });
           
                if (!user || !validatePassword(password, user.password, user.salt)) {
                    return callback(undefined, false);
                }
                
                return callback(undefined, user)
                
            }));
    
    passport.serializeUser((user: User, callback) => {
        callback(null, user.id);
    });
    
    passport.deserializeUser(async (id, callback) => {
        const user = await User.findByPk(id);
        callback(null, user)
    });
    
}

export function customAuthenticate(req, res, next) {
    
    passport.authenticate('local', (err, user, info) => {
        
        if (err) return next(err);
        
        if (!user) return res.status(401).json({ message: 'credentials does not match our records!' });
        
        req.login(user, (err) => {
            
            if (err) return next(err);
            
            return res.json({ user });
        });
        
    })(req, res, next);
    
}