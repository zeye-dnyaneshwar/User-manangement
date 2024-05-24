const { getAcccessTokenController, getUserDataController } = require('../controllers/git.controllers');

const gitRouter = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: GitHub
 *   description: GitHub OAuth routes
 */

/**
 * @swagger
 * /api/v1/git/accessToken:
 *   get:
 *     summary: Get GitHub Access Token
 *     tags: [GitHub]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: GitHub OAuth code
 *     responses:
 *       200:
 *         description: GitHub access token and primary email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token from GitHub
 *                 email:
 *                   type: string
 *                   description: Primary email of the GitHub user
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ErrorResponse'
 */

/**
 * @swagger
 * /api/v1/git/getUserData:
 *   get:
 *     summary: Get GitHub User Data
 *     tags: [GitHub]
 *     parameters:
 *       - in: header
 *         name: accesstoken
 *         schema:
 *           type: string
 *         required: true
 *         description: GitHub access token
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user
 *     responses:
 *       200:
 *         description: User data from GitHub
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ErrorResponse'
 */

gitRouter.get("/accessToken", getAcccessTokenController);
gitRouter.get("/getUserData", getUserDataController);

module.exports = gitRouter;
