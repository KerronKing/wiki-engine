const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const wikiPagesRouter = require('./routes/wikiPages');

const app = express();
const connection = 'mongodb+srv://KerronKing:KerronKing123@cluster0-ndioi.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(connection,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/wikiPages', wikiPagesRouter);
app.listen(3000);