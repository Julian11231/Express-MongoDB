const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.render('index', {});
});

router.get('/admin', async(req, res) => {
    res.render('admin', {});
});

module.exports = router;