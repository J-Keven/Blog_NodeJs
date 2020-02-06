// importando os modulos
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const handleBars = require('express-handlebars');
const session = require('express-session')
const flash = require('connect-flash')

const adminRouters = require('./routes/admin')
const path = require('path')

const app = express()
const PORT = 3000

mongoose.connect("mongodb+srv://keven:jhonas4313@cluster0-vvpyt.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{26
    console.log('Conectado com sucesso')
}).catch((err)=>{
    console.log(`Erro: ${err}`)
})

// sessões
app.use(session({
    secret: 'curosodenode',
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

// middleware
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.err_msg = req.flash('err_msg')
    next()
})

// configurações do body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// configurações do handlebars
app.engine('handlebars', handleBars({defaultLayout: 'main'}))
app.set('view engine','handlebars')

// configurando express.static
app.use(express.static(path.join(__dirname,'public')))

// rotas
app.use('/admin', adminRouters)

// definindo a porta
app.listen(PORT, ()=>{
    console.log(`O serever esta rodando no endereço: http://localhost:${PORT}`)
})