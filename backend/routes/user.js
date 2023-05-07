const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Endpoints pour l'authentification des utilisateurs
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Crée un nouvel utilisateur avec une adresse email et un mot de passe
 *     tags:
 *       - Authentification
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
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *     responses:
 *       '201':
 *         description: Utilisateur créé avec succès
 *       '400':
 *         description: Requête invalide
 */

router.post("/signup", userCtrl.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connectez-vous avec une adresse email et un mot de passe
 *     description: Connectez-vous avec une adresse email et un mot de passe existants pour obtenir un token d'authentification
 *     tags:
 *       - Authentification
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
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: ID de l'utilisateur connecté
 *                 token:
 *                   type: string
 *                   description: Token d'authentification à utiliser pour les requêtes ultérieures
 *       '400':
 *         description: Requête invalide
 *       '401':
 *         description: Mauvaises informations d'identification
 */

router.post("/login", userCtrl.login);

module.exports = router;
