const express = require('express');
const Music = require('../../Database/models/musicModel');

const musicRouter = express.Router();

// GET une musique
musicRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const music = await Music.findById(id);

    if (!music) {
      return res.status(404).send({ message: 'Music not found' });
    }

    res.json(music);
  } catch (error) {
    console.error('Error fetching music:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// GET toutes les musiques
musicRouter.get('/', async (req, res) => {
  try {
    const musics = await Music.find();
    res.json(musics);
  } catch (error) {
    console.error('Error fetching musics:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// DELETE une musique
musicRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const music = await Music.findByIdAndDelete(id);

    if (!music) {
      return res.status(404).send({ message: 'Music not found' });
    }

    res.json(music);
  } catch (error) {
    console.error('Error deleting music:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = musicRouter;