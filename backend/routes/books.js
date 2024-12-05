const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/book');

// Route non protégé
router.get('/', bookCtrl.getAllBooks);            // Route pour récupérer tous les livres
router.get('/:id', auth, bookCtrl.getOneBook);    // Route pour récupère qu'un livre avec id correspondante

// Route protégé
router.post('/', auth, bookCtrl.createBook);      // Route pour l'envoie d'un livres
router.put('/:id', auth, bookCtrl.modifyBook);    // Route pour modifié un livre avec id correspondante
router.delete('/:id', auth, bookCtrl.deleteBook); // Route pour supprimer un livre avec id correspondante 


module.exports = router;