const http = require('http');
const express = require('express');

const faker = require('faker');

const app = express();
const server = http.createServer(app);

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');


const PORT = 5000;
const HOST = '0.0.0.0';

let allPhrases = [];

app.get('/', (req, res) => {

    allPhrases = [];
    res.render('home');
});

app.get('/next', (req, res) => {
    // Every time we refresh
    let phrase = faker.hacker.phrase();
    allPhrases.push(phrase);
    res.render('next', {
        locals: {
            phrase
        }
    })
});

app.get('/all', (req, res) => {
    res.render('all', {
        locals: {
            all: allPhrases,
            count: allPhrases.length,
        }
    })
});

app.get("/all/show/:id",(req,res)=>{
    const {id} = req.params
    res.render("show", {
        locals:{id,}
    })
})

app.get("/delete/:msg",(req,res)=>{
    const {msg} = req.params
    allPhrases = allPhrases.filter(p=> p!=msg)
    res.render("delete", {
        locals:{msg,}
    })
})



server.listen(PORT, HOST, () => {
    console.log(`Working hard over at http://${HOST}:${PORT}`);
});
