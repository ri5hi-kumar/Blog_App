const express = require('express');
const articlesRouter = require('./routes/articles');
const Article = require('./models/article');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Mongodb connection
const uri = process.env.ATLAS_URI;
mongoose.set("strictQuery", false);
mongoose.connect(uri);

app.use('/articles', articlesRouter);

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'});
    res.render('index', {articles : articles});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);