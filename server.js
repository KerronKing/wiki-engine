const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const wikiPagesRouter = require('./routes/wikiPages');

const app = express();
mongoose.connect('mongodb://localhost/wikiengine',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    throw err;
  });
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/wikiPages', wikiPagesRouter);
app.listen(3000);