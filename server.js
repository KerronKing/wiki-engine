const express = require('express');
const wikiPagesRouter = require('./routes/wikiPages');

const app = express();
app.set('view engine', 'ejs');

app.use('/wikiPages', wikiPagesRouter);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000);