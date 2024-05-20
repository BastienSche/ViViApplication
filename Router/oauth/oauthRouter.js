const express = require('express');
const User = require('../../Database/models/userModel');

const oauthRouter = express.Router();

oauthRouter.post('/token', async (req, res) => {
  const { firebaseToken } = req.body;

  if (!firebaseToken) {
    return res.status(400).send({ message: 'Missing firebaseToken' });
  }

  try {
    const user = await User.findOne({ firebaseToken });

    if (!user) {
      const newUser = new User({ firebaseToken });
      await newUser.save();
      res.status(201).send({ message: 'User created' });
    } else {
      res.status(200).send({ message: 'User authenticated' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = oauthRouter;
