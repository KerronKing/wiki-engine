const express = require('express');
const WikiPage = require('../models/wikiPage');

const router = express.Router();

router.get('/index', (req, res) => {
  res.render('wikiPages/index');
});

router.get('/:id', (req, res) => {
  const wikiPage = WikiPage.findById(req.params.id);
  if (wikiPage) {
    res.render('wikiPages/show', { wikiPage });
  } else {
    res.redirect('/new');
  }
});

router.get('/new', (req, res) => {
  res.render('wikiPages/new', { wikiPage: new WikiPage() });
});

router.get('/edit', (req, res) => {
  res.render('wikiPages/edit');
});

router.post('/', async (req, res) => {
  let wikiPage = new WikiPage({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    wikiPage = await wikiPage.save();
    res.redirect(`/wikiPages/${wikiPage.id}`);
  } catch (err) {
    res.render('wikiPages/new', { wikiPage });
  }
});

module.exports = router;
