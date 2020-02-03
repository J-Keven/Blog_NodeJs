const express = require('express')
const router = express.Router()

const categoriaCOntroller = require('../controllers/CategoriaController')
const reloadCategorias = require('../controllers/reloadCategorias')
const saveEdition = require("../controllers/SaveEditions")
const deleteCategoria = require('../controllers/deleteCategorie')

router.get('/',(req, res)=>{
    res.render('admin/index')
})

router.get('/posts', (req, res)=>{
    res.render('admin/posts')
})

router.get('/categoria/add', (req, res)=>{
    res.render('admin/addCategoria')
})

router.get('/categoria/delete/:id', deleteCategoria.delete)

router.post('/categoria/edition/:id', saveEdition.Save)

router.get('/categoria/edit/:_id', reloadCategorias.reloadId)

router.get('/categoria', reloadCategorias.reload)

router.post('/categoria/new',categoriaCOntroller.storeCatergoria)

module.exports = router;