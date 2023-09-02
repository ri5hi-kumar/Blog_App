const mongoose = require('mongoose');
const slugify = require('slugify'); // title in the url
const marked = require('marked'); // markdown

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

// run before insertion
articleSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, { lower: true,
            strict: true });
    }
    next();
});

module.exports = mongoose.model('Article', articleSchema);