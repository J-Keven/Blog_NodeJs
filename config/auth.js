const localPassport = require('passport-local').Strategy
const bcryptjs = require('bcryptjs')
const User = require("../models/user")


module.exports = (passport) => {
    passport.use(new localPassport({usernameField: 'email'}, (email, password, done) => {
        User.findOne({ email }).then((user) => {
            if(!user){
                return done(null, false, {message: "Esta conta nao existe"})
            }
            
            bcryptjs.compare(password, user.password, (err, success) => {
                if(success){
                    return done(null, user)
                }
                else{
                    return done(null, false, {message: "Senha inválida!"})
                }
            })
        })
    }))

    passport.serializeUser((user, done) =>{
        done(null,user.id)
    })

    passport.deserializeUser((_id, done) => {
        User.findById(_id, (err, user) => {
            done(err, user)
        })
    })
}