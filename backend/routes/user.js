const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);      // Route pour la création d'un nouvelle utilisateur
router.post('/login', userCtrl.login);        // Route pour la connexion d'un utilisateur

module.exports = router; 