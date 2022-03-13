const router = require('express').Router();
const controller = require('./messages.controller');

/**
 * @swagger
 *   /api/messages:
 *     get:
 *       tags:
 *       - Messages
 *       description: Get all messages
 *       responses:
 *         200:
 *           description: Array with a list of messages
 */
router.get('/', controller.getAll);

/**
 * @swagger
 *   /api/messages/{id}:
 *     get:
 *       tags:
 *       - Messages
 *       description: Get one message by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The message's unique ID
 *       responses:
 *         200:
 *           description: An object with a single message's data
 */
router.get('/:id', controller.getOne);


/**
 * @swagger
 *   /api/messages:
 *     post:
 *       tags:
 *       - Messages
 *       description: Creates a new message
 *       parameters:
 *         - in: body
 *           name: channel
 *           schema:
 *             type: object
 *             properties:
 *               channelId:
 *                type: string
 *               userId:
 *                type: string
 *               text:
 *                type: string
 *       responses:
 *         200:
 *           description: new channel created
 */
router.post('/', controller.create);

module.exports = router;