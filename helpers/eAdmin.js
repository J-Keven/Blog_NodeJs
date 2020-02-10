module.exports = {
    eAdmin: (req, res, next) => {
        if(req.isAuthenticated()){
           return next()
        }
        else{
            req.flash('err_msg', "Faca o seu login ou cadastre-se")
            res.redirect('/user/login')
        }
    }
}