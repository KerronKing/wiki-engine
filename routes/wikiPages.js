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

router.get('/:slug', async (req, res) => {
  const wikiPage = await WikiPage.findOne({ slug: req.params.slug });
  if (wikiPage) {
    res.render('wikiPages/show', { wikiPage });
  } else {
    res.redirect('/');
  }
});

router.get('/edit/:id', async (req, res) => {
  const wikiPage = await WikiPage.findById(req.params.id);
  res.render('wikiPages/edit', { wikiPage });
});

function saveAndRedirect(path) {
  return async (req, res) => {
    let { wikiPage } = req;
    wikiPage.title = req.body.title;
    wikiPage.content = req.body.content;

    try {
      wikiPage = await wikiPage.save();
      res.redirect(`/wikiPages/${wikiPage.slug}`);
    } catch (err) {
      res.render(`wikiPages/${path}`, { wikiPage });
    }
  };
}

router.post('/', async (req, res, next) => {
  req.wikiPage = new WikiPage();
  next();
}, saveAndRedirect('new'));

router.put('/:id', async (req, res, next) => {
  req.wikiPage = await WikiPage.findById(req.params.id);
  next();
}, saveAndRedirect('edit'));

router.delete('/:id', async (req, res) => {
  await WikiPage.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
