import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import config from '.';
import { User } from '../app/modules/user/user.model';
import { USER_ROLES } from '../enums/user';

passport.serializeUser(function (user:any, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user:any, done) {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: config.google.client_id!,
            clientSecret: config.google.client_secret!,
            callbackURL: `${config.url.base_url}/auth/google/callback`,
        },
        async function (accessToken, refreshToken, profile, done) {
            let user:any = await User.findOne({ email: profile.emails![0].value });
            
            if (!user) {
                try {
                    user = await User.create({
                    name: profile.displayName,
                    email: profile.emails![0].value,
                    role: USER_ROLES.CANDIDATE,
                    password: 'password',
                    verified: true,
                    image: profile.photos![0].value,
                });
                } catch (error) {
                    console.log(error);
                    
                }
            }
            
            return done(null, user);
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: config.facebook.client_id!,
            clientSecret: config.facebook.client_secret!,
            callbackURL: `${config.url.base_url}/auth/facebook/callback`,
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

export default passport;
