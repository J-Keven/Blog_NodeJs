const express = require('express')
const router = express.Router()

const user = require('../models/user')

router.get('/login', (req, res) =>{
    res.render('user/login')
})

router.get('/cadastro', (req, res) =>{
    res.render('user/cadastro')
})

module.exports = router