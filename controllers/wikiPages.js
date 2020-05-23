const express = require('express');
const WikiPage = require('../models/wikiPage');

const router = express.Router();

const escapeRegex = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

router.get('/', (req, res) => {
  if (req.query.title) {
    const regex = new RegExp(escapeRegex(req.query.title), 'gi');
    WikiPage.find({ title: regex }, (err, pages) => {
      if (err) {
        throw err;
      } else {
        res.render('wikiPages/index', { wikiPages: pages });
      }
    });
  }
});

router.get('/index', async (req, res) => {
  res.render('wikiPages/index', { wikiPages: await WikiPage.find() });
});

router.get('/new', (req, res) => {
  res.render('wikiPages/new', { wikiPage: new WikiPage() });
});

router.get('/:id', async (req, res) => {
  const wikiPage = await WikiPage.findById(req.params.id);
  if (wikiPage) {
    res.render('wikiPages/show', { wikiPage });
  } else {
    res.redirect('/');
  }
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
