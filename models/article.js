const mongoose = require('mongoose');
const slugify = require('slugify'); // title in the url
const { marked } = require('marked'); // markdown to html

// when adding markdown to change it into html we have to check
// for malicious html
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

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
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
});

// run before insertion
articleSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, { lower: true,
            strict: true });
    }
    if(this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }
    next();
});

module.exports = mongoose.model('Article', articleSchema);