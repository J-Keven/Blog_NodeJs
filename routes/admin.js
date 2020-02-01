const express = require('express')
const router = express.Router()

const categoriaCOntroller = require('../controllers/CategoriaController')
const reloadCategorias = require('../controllers/reloadCategorias')

router.get('/',(req, res)=>{
    res.render('admin/index')
})

router.get('/posts', (req, res)=>{
    res.render('admin/posts')
})

router.get('/categoria/add', (req, res)=>{
    res.render('admin/addCategoria')
})

router.get('/categoria', reloadCategorias.reload)

router.post('/categoria/new',categoriaCOntroller.storeCatergoria)

module.exports = router;