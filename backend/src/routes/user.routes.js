const { updateProfileController, getOneUserController, getAllUserController } = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const validateRequest = require("../middlewares/validation.middleware");
const upload = require("../services/multer");
const { updateSchema } = require("../validators/user.validation");

const userRouter = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: All routes related to User
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UpdateUser:
 *       type: object
 *       properties:
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
 *           description: New password for the user.
 *           example: newpassword123
 *         accountType:
 *           type: string
 *           enum: [Public, Private]
 *           description: Account type of the user.
 *           example: Private
 *         bio:
 *           type: string
 *           description: Short biography of the user.
 *           example: Hey! I am Using Voosh App
 *         phone:
 *           type: string
 *           description: Phone number of the user.
 *           example: 123-456-7890
 *         image:
 *           type: string
 *           format: binary
 *           description: Profile image file of the user.
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
 *         accountType:
 *           type: string
 *           enum: [Public, Private]
 *           description: Account type of the user.
 *           example: Public
 *         bio:
 *           type: string
 *           description: Short biography of the user.
 *           example: Hey! I am Using Voosh App
 *         phone:
 *           type: string
 *           description: Phone number of the user.
 *           example: 123-456-7890
 *         image:
 *           type: string
 *           format: url
 *           description: Profile image URL of the user.
 *           example: https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: Error message.
 *           example: An error occurred
 */

/**
 * @swagger
 * /api/v1/users/update/{id}:
 *   patch:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

userRouter.patch("/update/:id", auth, upload.single("image"), validateRequest(updateSchema), updateProfileController);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

userRouter.get("/:id", auth, getOneUserController);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

userRouter.get("/", auth, getAllUserController);

module.exports = userRouter;
