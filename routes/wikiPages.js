const express = require('express');

const router = express.Router();

router.get('/index', (req, res) => {
  res.render('wikiPages/index');
});

router.get('/new', (req, res) => {
  res.render('wikiPages/new');
});

router.get('/edit', (req, res) => {
  res.render('wikiPages/edit');
});

router.post('/', (req, res) => {

});

module.exports = router;
