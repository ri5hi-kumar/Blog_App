const express = require('express');
const articlesRouter = require('./routes/articles');
const app = express();

app.set('view engine', 'ejs');

app.use('/articles', articlesRouter);

app.get('/', (req, res) => {
    const articles = [
        {
            title: 'Test',
            date: Date.now(),
            description: 'This is the test description'
        }
    ]
    res.render('index', {articles : articles});
});

app.listen(5000);