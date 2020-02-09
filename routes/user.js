const express = require('express')
const router = express.Router()
const bcryptjs = require("bcryptjs")
const user = require('../models/user')
const passport = require('passport')

router.get('/login', (req, res) =>{
    res.render('user/login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: "/user/login",
        failureFlash: true
    })(req, res, next)
    
}) 

router.get('/cadastro', (req, res) =>{
    res.render('user/cadastro')
})

router.post('/cadastro', (req, res) => {
    const {name, email, password, password2 } = req.body
    user.findOne({email}).then((register) => {
        let erros = []
        if(register){
            erros.push({
                text: "E-mail ja cadastrado. Por favor, tenten outro!"
            }) 
        }
        if(password.length < 5){
            erros.push({
                text: "A senha é muito curta. Por favor, tenten outra!"
            })
        }
        else if(password != password2){
            erros.push({
                text: "As senhas nao coencidem. Por favor, tenten novamente!"
            })
        }
        
        if(erros.length > 0){
            res.render('user/cadastro', {erros: erros})
        }
        else{
            bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(password, salt ,(err, hash) =>{
                    if(err){
                        req.flash("err_msg", "Houve um erro ao cadastrar, tente novamente")
                        res.redirect('/')
                    }
                    user.create({
                        name: name,
                        email: email,
                        password: hash
                    }).then(() => {
                        req.flash("success_msg",'Cadastro realizado com sucesso!')
                        res.redirect("/")
                    }).catch(() => {
                        req.flash('err_msg', "Houve um erro ao realizar o seu cadastro, tente novamente!")
                        res.redirect('/user/cadastro')
                    })
                })
            })
        }
    })
})

module.exports = router