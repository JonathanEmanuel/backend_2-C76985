import passport from 'passport'
import {  Strategy as LocalStrategy } from 'passport-local'
import { UserModel } from '../models/user.model'
import { createHash, isValidPassword } from '../utils/crypto.js'

passport.use('register', new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async ( req, email, password, done) => {
       try {
            const { role = 'user' } = req.body;
            const { name, age} = req.body;
            const exists = await UserModel.findOne({ email });
            if( exists) {
                return  done(null, false);
            }

            const hashed = await createHash(password);
            
            const user = await UserModel.create({name, email, password: hashed, age, role});

            return done( null, user);

       } catch (error) {
            return done( error)
       } 
    }  
));

passport.use('login', new LocalStrategy(
    { usernameField: 'email'}, 
    async (email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if( !user) {
                return done(null, false)
            }
            // Verificamos el password
            const ok = await isValidPassword(password, user.password);
            if( !ok) {
                return done(null, false);
            }

            return done(null, user);

        } catch (error) {
            return done( error)
        }
    }
));

// Para trabajar con sessiones
passport.serializeUser( (user, done) => done( null, user._id ));

passport.deserializeUser( async ( _id, done) => {
    const user = await UserModel.findById(_id);
    done( null, user);
})
