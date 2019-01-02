const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

// heroku将会设立该环境变量,并执行npm start脚本来运行程序
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//middleware
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('console.log', log + '\n', (error) => {
        if (error) {
            console.log(error);
        }
    });
    next();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'homepage',
        welcomeMessage: 'welcome to homepage',
        currentYear: new Date().getFullYear()
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs')
});

app.get('/bad', (req, res) => {
    res.render('help.hbs', {
        errorMessage: 'can i help you',
    })
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
});