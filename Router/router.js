const express = require('express');
const User = require('../Database/models/userModel');
const dbConnection = require('../Database/config');
const oauthRouter = require ('./oauth/oauthRouter')
const musicRouter = require('./music/musicRouter')
const queueRouter = require('./queue/queueRouter')
const roomRouter = require('./room/roomRouter')

const router = express.Router();

// router.use(async (req, res, next) => {
//   await dbConnection();
//   next();
// });

router.use('/oauth', oauthRouter)
router.use('/music', musicRouter)
router.use('/queues', queueRouter)
router.use('/rooms', roomRouter)

module.exports = router;
