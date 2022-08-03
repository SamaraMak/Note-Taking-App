const express = require('express');
const router = express.Router();
const Note = require('../models/note');

router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/notes/search', async (req, res) => {
  console.log(req.body.search);
  let fnotes = await (await Note.find()).filter(fn => fn.tags === req.body.search);
  res.render('index', {notes: fnotes})
})

router.post('/notes', async (req, res) => {
  let note = await new Note({
    //userId: the authenticated userId
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    tags: req.body.tags
  });
  try {
    note = await note.save();
    res.redirect('/notes');
  } catch (e) {
    console.log(e);
    res.render('new');
  }
});  // Create a new note

router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndRemove(req.params.id);
    res.redirect('/notes');
  } catch (e) {
    console.log(e);
    res.redirect('/notes');
  }
});  // Deletes the note

router.put('/:id', async (req, res, next) => {
  await Note.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    modifiedAt: Date.now()});
  res.redirect('/notes');
});  // Updates the note

module.exports = router;