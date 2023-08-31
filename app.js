const express = require('express');
const articlesRouter = require('./routes/articles');
const app = express();

app.set('view engine', 'ejs');

app.use('/articles', articlesRouter);

app.get('/', (req, res) => {
    const articles = [
        {
            title: 'Test',
            createdAt: new Date(),
            description: 'This is the test description'
        },
        {
            title: 'Test2',
            createdAt: new Date(),
            description: 'This is the test 2 description'
        }
    ]
    res.render('index', {articles : articles});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);