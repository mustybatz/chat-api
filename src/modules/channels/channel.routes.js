const router = require('express').Router();
const controller = require('./channels.controller');

/**
 * @swagger
 *   /api/channels:
 *     get:
 *       tags:
 *       - Channels
 *       description: Get all channels
 *       responses:
 *         200:
 *           description: Array with a list of channels
 */
router.get('/', controller.getAll);

/**
 * @swagger
 *   /api/channels/{id}:
 *     get:
 *       tags:
 *       - Channels
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
 *   /api/channels:
 *     post:
 *       tags:
 *       - Channels
 *       description: Creates a new channel
 *       parameters:
 *         - in: body
 *           name: channel
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                type: string
 *               owner:
 *                type: string
 *       responses:
 *         200:
 *           description: new channel created
 */
router.post('/', controller.create);

/**
 * @swagger
 *   /api/channels/createlink/{owner}:
 *     get:
 *       tags:
 *       - Channels
 *       description: Join a channel
 *       parameters:
 *         - in: path
 *           name: owner
 *           required: true
 *           description: The owners's unique email
 *       responses:
 *         200:
 *           description: An object with a single message's data
 */
router.get('/createlink/:owner', controller.getLink);

/**
 * @swagger
 *   /api/channels/{id}/{email}:
 *     get:
 *       tags:
 *       - Channels
 *       description: Join a channel
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The channels's unique ID
 *         - in: path
 *           name: email
 *           required: true
 *           description: The user's email
 *       responses:
 *         200:
 *           description: An object with a single message's data
 */
router.get('/api/channels/:id/:email', controller.getLink);
module.exports = router;