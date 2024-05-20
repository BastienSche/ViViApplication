const express = require('express');
const Room = require('../../Database/models/rommModel');
const dbConnection = require('../../Database/config');

const roomRouter = express.Router();

// POST créer une room
roomRouter.post('/', async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
    return res.status(400).send({ message: 'Missing name' });
    }

    try {
    const room = new Room({ name, description });
    await room.save();
    console.log(`Room ${room.name} created.`);
    res.json(room);
    } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).send({ message: 'Internal server error' });
    }
});

// DELETE supprimer une room
roomRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const room = await Room.findByIdAndDelete(id);

    if (!room) {
        return res.status(404).send({ message: 'Room not found' });
    }
    console.log(`Room ${room.name} deleted.`);
    res.json(room);
    } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).send({ message: 'Internal server error' });
    }
});

// PUT modifier une room
roomRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
    const room = await Room.findByIdAndUpdate(id, { name, description }, { new: true }); // Retourne la room mise à jour

    if (!room) {
        return res.status(404).send({ message: 'Room not found' });
    }

    res.json(room);
    } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = roomRouter