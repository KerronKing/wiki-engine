const express = require('express');
const mongoose = require('mongoose');
const wikiPagesRouter = require('./controllers/wikiPages');

const app = express();
mongoose.connect('mongodb://localhost/wikiengine',
  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    throw err;
  });
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/wikiPages', wikiPagesRouter);
app.listen(3000);