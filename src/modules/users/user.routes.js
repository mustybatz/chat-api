const router = require('express').Router();
const controller = require('./users.controller');

/**
 * @swagger
 *   /api/users:
 *     get:
 *       tags:
 *       - Users
 *       description: Get all users
 *       responses:
 *         200:
 *           description: Array with a list of users
 */
router.get('/', controller.getAll);

/**
 * @swagger
 *   /api/users/{id}:
 *     get:
 *       tags:
 *       - Users
 *       description: Get one user by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The user's unique ID
 *       responses:
 *         200:
 *           description: An object with a single user's data
 */
router.get('/:id', controller.getOne);

/**
 * @swagger
 *   /api/users/signup:
 *     post:
 *       tags:
 *       - Users
 *       description: Creates a new user
 *       parameters:
 *         - in: body
 *           name: user
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                type: string
 *               password:
 *                type: string
 *       responses:
 *         200:
 *           description: An object with a single user's data
 */
router.post('/signup', controller.create);

/**
 * @swagger
 *   /api/users/login:
 *     post:
 *       tags:
 *       - Users
 *       description: Logs into an account
 *       parameters:
 *         - in: body
 *           name: user
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                type: string
 *               password:
 *                type: string
 *       responses:
 *         200:
 *           description: JWT token
 */
router.post('/login', controller.login);


module.exports = router;