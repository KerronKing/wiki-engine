const express = require('express');
const wikiPageRouter = require('./routes/wikiPages');

const app = express();
app.set('view engine', 'ejs');

app.use('/wikiPage', wikiPageRouter);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000);