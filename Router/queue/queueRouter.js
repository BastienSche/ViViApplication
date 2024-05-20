const express = require('express');
const Queue = require('../../Database/models/queueModel');
const Music = require('../../Database/models/musicModel'); // Référence au model Music
const dbConnection = require('../../Database/config');

const queueRouter = express.Router();

// GET toutes les musiques en attente d'une file d'attente spécifique
queueRouter.get('/:roomId', async (req, res) => {
    const { roomId } = req.params;

    try {
    const queue = await Queue.findOne({ roomId }).populate('musics');

    if (!queue) {
        return res.status(404).send({ message: 'Queue not found' });
    }

    res.json(queue.musics);
    } catch (error) {
    console.error('Error fetching queue:', error);
    res.status(500).send({ message: 'Internal server error' });
    }
});

// DELETE une musique d'une file d'attente
queueRouter.delete('/:roomId/musics/:musicId', async (req, res) => {
    const { roomId, musicId } = req.params;

    try {
    const queue = await Queue.findOneAndUpdate(
        { roomId },
        { $pull: { musics: musicId } } // Retire la musique de la file d'attente
    );

    if (!queue) {
        return res.status(404).send({ message: 'Queue not found' });
    }

    await Music.findByIdAndUpdate(musicId, { status: 'waiting' }); // Met la musique à l'état 'en attente'

    res.json({ message: 'Music deleted from queue' });
    } catch (error) {
    console.error('Error deleting music from queue:', error);
    res.status(500).send({ message: 'Internal server error' });
    }
});

// POST envoyer une musique dans une file d'attente
queueRouter.post('/:roomId/musics', async (req, res) => {
    const { roomId } = req.params;
    const { url, title } = req.body;
  
    if (!url ) {
      return res.status(400).send({ message: 'Missing url or title' });
    }
  
    try {
      // Vérification si une file d'attente existe déjà pour cette salle
      let queue = await Queue.findOne({ roomId });
  
      // Si aucune file d'attente n'existe, créez-en une nouvelle
      if (!queue) {
        queue = new Queue({ roomId });
        await queue.save();
      }
  
      // Création d'une nouvelle musique
      const music = new Music({ url, title });
      await music.save();
  
      // Ajout de la musique à la file d'attente
      queue.musics.push(music._id);
      await queue.save();
  
      // Renvoie la file d'attente mise à jour
      res.json(queue);
    } catch (error) {
      console.error('Error adding music to queue:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

// PUT valider une musique (passe son statut à 'playing')
queueRouter.put('/:roomId/musics/:musicId/validate', async (req, res) => {
const { roomId, musicId } = req.params;
const musicIndex = parseInt(musicId);

try {
    const queue = await Queue.findOneAndUpdate(
        { roomId },
        { $set: { [`musics.${musicIndex}`]: 'playing' } }, // Use template literal (Node.js 14+)
        { new: true }
      );

    if (!queue) {
    return res.status(404).send({ message: 'Queue or music not found' });
    }

    await Music.findByIdAndUpdate(musicId, { status: 'playing' }); // Met à jour le statut de la musique

    res.json({ message: 'Music validated' });
} catch (error) {
    console.error('Error validating music:', error);
    res.status(500).send({ message: 'Internal server error' });
}
});

// PUT passer une musique (passe son statut à 'played' et supprime de la file d'attente)
queueRouter.put('/:roomId/musics/:musicId/skip', async (req, res) => {
    const { roomId, musicId } = req.params;

    try {
        const queue = await Queue.findOneAndUpdate(
        { roomId },
        { $pull: { musics: musicId } } // Retire la musique de la file d'attente
        );

        if (!queue) {
        return res.status(404).send({ message: 'Queue not found' });
        }

        await Music.findByIdAndUpdate(musicId, { status: 'played' }); // Met à jour le statut de la musique

        res.json({ message: 'Music skipped' });
    } catch (error) {
        console.error('Error skipping music:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = queueRouter;