const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const previsao = require('./utils/previsao')

const port = process.env.PORT || 3000

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Clima Hoje',
        name: 'Daniel S.'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name:'Daniel S.'
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        help:'Help',
        message:'Contato (41)99759-0218',
        title: 'Help',
        name: 'Daniel S.'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'Please provide an address'
        })        
    }
    
    geocode(req.query.address,(error, { latitude, longitude, location } = {}) => {    
        if (error){            
            return res.send({error})
        }
        previsao(latitude, longitude, (error, { resumo, temperatura, precipitacao } = {}) =>{        
            if(error){                            
                return res.send({ error })
            }
            //console.log(resumo + ` Com temperatura atual de ${temperatura} celsius. Com ${chanceChuva}% de chance de chuva`)
            //console.log(location)

            res.send({
                forecast: resumo, 
                location: location,
                temperature: temperatura,
                rainchance: precipitacao        
            })        
        })    
    })


    //console.log(req.query.address)

})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        name: 'Daniel S.',
        title:'404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        name: 'Daniel S.',
        title:'404'
    })
})

app.listen(port, ()=>{
    console.log('Server rodando na porta' + port)
})