const express = require('express')
const router = express.Router()

const categoriaCOntroller = require('../controllers/CategoriaController')
const reloadCategorias = require('../controllers/reloadCategorias')
const saveEdition = require("../controllers/SaveEditions")
const deleteCategoria = require('../controllers/deleteCategorie')
const postSave = require('../controllers/postSave')

router.get('/',(req, res)=>{
    res.render('admin/index')
})

router.get('/posts', (req, res)=>{
    res.render('admin/posts')
})

router.get('/posts/add', (req, res)=>{
    reloadCategorias.reload().then((categories)=>{
        res.render('admin/addPost', {categories: categories.map(item=>{
            return {id: item._id, name: item.name, slug: item.slug, date: item.date}
            })
        })
    }).catch((err)=>{
        req.flash("err_msg", "Houve um erro ao carregar as categorias, tente novamente!!")
        res.redirect('/admin')
    })
})

router.post('/posts/new', postSave.storePost)

router.get('/categoria', (req, res)=>{
    reloadCategorias.reload().then((categories)=>{
            res.render('admin/categoria', {categories: categories.map( item => {
                return {id: item._id, name: item.name, slug: item.slug, date: item.date}
                })
            })
        }).catch((err)=>{
            req.flash('err_msg', "Houve um erro ao carregar as categorias!")
            res.redirect('/admin')
        })
})

router.get('/categoria/add', (req, res)=>{
    res.render('admin/addCategoria')
})

router.post('/categoria/new',categoriaCOntroller.storeCatergoria)

router.get('/categoria/edit/:_id', reloadCategorias.reloadId)

router.post('/categoria/edition/:id', saveEdition.Save)

router.post('/categoria/delete/', deleteCategoria.delete)

module.exports = router