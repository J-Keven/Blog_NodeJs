const express = require('express')
const router = express.Router()

const categoriaCOntroller = require('../controllers/CategoriaController')
const reloadCategorias = require('../controllers/reloadCategorias')
const saveEdition = require("../controllers/SaveEditions")
const deleteCategoria = require('../controllers/deleteCategorie')
const postSave = require('../controllers/postSave')
const reloadPosts = require('../controllers/reloadPosts')
const deletePost = require('../controllers/deleteposts')
const Posts = require('../models/post')
const categoria = require('../models/Categora')
const { eAdmin } = require('../helpers/eAdmin')

router.get('/', eAdmin, (req, res) =>{
    res.redirect('/user/ligin')
})

router.get('/posts',  eAdmin, (req, res)=>{
    reloadPosts.reloadAll().then((posts) =>{
        res.render('admin/posts', {posts: posts.map( post => {
            return {
                id: post._id,
                title: post.title,
                slug: post.slug,
                description: post.description,
                content: post.content,
                categorie: post.categorie.name,
                date: post.date,
                userName: post.user
            }
        })})
    })
})


router.get('/posts/add',  eAdmin, (req, res)=>{
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

router.post('/posts/new',  eAdmin, postSave.storePost)

router.post('/posts/delete',  eAdmin, deletePost.deletePost)

router.get('/posts/edit/:_id',  eAdmin, reloadPosts.reloadId)

router.post('/posts/saveEditions',  eAdmin, postSave.saveEditionsPost)

router.get('/categoria',  eAdmin, (req, res)=>{
    reloadCategorias.reload().then((categories)=>{
            res.render('admin/categoria', {categories: categories.map( item => {
                return {id: item._id, name: item.name, slug: item.slug, date: item.date, userName: item.user}
                })
            })
        }).catch((err)=>{
            req.flash('err_msg', "Houve um erro ao carregar as categorias!")
            res.redirect('/admin')
        })
})

router.get('/categoria/add', eAdmin, (req, res) => {
    res.render('admin/addCategoria')
})

router.post('/categoria/new',  eAdmin, categoriaCOntroller.storeCatergoria)

router.get('/categoria/edit/:_id',  eAdmin, reloadCategorias.reloadId)

router.post('/categoria/edition/:id',  eAdmin, saveEdition.Save)

router.post('/categoria/delete/',  eAdmin, deleteCategoria.delete)



module.exports = router