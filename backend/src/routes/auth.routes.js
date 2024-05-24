const { registerController, loginController, logoutController } = require("../controllers/auth.controllers");
const auth = require("../middlewares/auth.middleware");
const validateRequest = require("../middlewares/validation.middleware");
const { registerSchema, loginSchema, logOutSchema } = require("../validators/auth.validation");

const authRouter = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: All routes related to Authentication
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the user.
 *         name:
 *           type: string
 *           description: Name of the user.
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user.
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           format: password
 *           description: Encrypted password of the user.
 *           example: password123
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 *           description: Role of the user.
 *           example: user
 *         accountType:
 *           type: string
 *           enum: [Public, Private]
 *           default: Public
 *           description: Account type of the user.
 *           example: Public
 *         bio:
 *           type: string
 *           description: Short biography of the user.
 *           default: Hey! I am Using Voosh App
 *           example: Hey! I am Using Voosh App
 *         phone:
 *           type: string
 *           description: Phone number of the user.
 *           default: 123-456-78
 *           example: 123-456-78
 *         image:
 *           type: string
 *           format: url
 *           description: Profile image URL of the user.
 *           default: https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png
 *           example: https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png
 *       required:
 *         - name
 *         - email
 *         - password
 * 
 *   responses:
 *     UserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the user.
 *         name:
 *           type: string
 *           description: Name of the user.
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user.
 *           example: johndoe@example.com
 *         token:
 *           type: string
 *           description: JWT token for the user.
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Error message.
 *           example: User Already Exist
 *     Blacklist:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token that is blacklisted.
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the user.
 *                 example: Password@123
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 default: user
 *                 description: Role of the user.
 *                 example: user
 *     responses:
 *       201:
 *         description: User Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UserResponse'
 *       409:
 *         description: Conflict - User Already Exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ErrorResponse'
 */

authRouter.post("/register", validateRequest(registerSchema), registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the user.
 *                 example: password123
 *     responses:
 *       201:
 *         description: User Logged In Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message.
 *                   example: User Logged In Successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the user.
 *                       example: 60d0fe4f5311236168a109ca
 *                     name:
 *                       type: string
 *                       description: Name of the user.
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: Email address of the user.
 *                       example: johndoe@example.com
 *                     token:
 *                       type: string
 *                       description: JWT token for the user.
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       401:
 *         description: Unauthorized - Incorrect Password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ErrorResponse'
 *       404:
 *         description: Not Found - User Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ErrorResponse'
 */

authRouter.post("/login", validateRequest(loginSchema), loginController);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT token of the user.
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *     responses:
 *       200:
 *         description: You have Logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message.
 *                   example: You have Logged out
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ErrorResponse'
 */

authRouter.post("/logout", auth, validateRequest(logOutSchema), logoutController);

module.exports = authRouter
