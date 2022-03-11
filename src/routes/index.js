const router = require('express').Router();

const userRoutes = require('./../modules/users/user.routes');
const channelRoutes = require('./../modules/channels/channel.routes');
const messageRoutes = require('./../modules/messages/message.routes');

router.use('/users', userRoutes);
router.use('/channels', channelRoutes);
router.use('/messages', messageRoutes);

module.exports = router;