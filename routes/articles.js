const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('In the article');
});

module.exports = router;