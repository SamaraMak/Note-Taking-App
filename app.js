require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const Note = require('./models/note');
const notesRouter = require('./routes/notes');

const methodOverride = require('method-override');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use(userRoutes);
app.use(authRoutes);

app.get('/', async (req, res) => {
  res.render('login');
});

app.post('/signup', async (req, res) => {
  res.redirect('/signup');
});

app.get('/signup', async (req, res) => {
  res.render('signup');
});

app.get('/notes', async (req, res) => {
  const notes = await Note.find().sort('-createdAt');
  res.render('index', { notes: notes });
});

// app.get('/notes', async (req, res) => {
//   const notes = await (await Note.find()).filter(fn => fn.tags === req.params.search);
//   res.render('filterindex', { notes: notes });
// });

app.post('/edit-note/:id', async (req, res) => {
  let note = await Note.findById(req.params.id); // Get note that needs to be edited
  try {
    res.render('edit', { note: note }); // sends note variable to edit.ejs
  }
  catch(e){
    console.log(e); //catches an exception
  }
});

//connecting to mongodb
mongoose.connect(process.env.SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(notesRouter);

app.use((req, res, next) => {
  res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);
