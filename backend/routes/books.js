const express = require('express');
const router = express.Router();
const { upload, processImage} = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/book');

// Route non protégé
router.get('/', bookCtrl.getAllBooks);  // Route pour récupérer tous les livres
router.get('/bestrating', bookCtrl.getBestRatings);  // Route pour récupérer les 3 meilleurs livres       
router.get('/:id', bookCtrl.getOneBook);          // Route pour récupère qu'un livre avec id correspondante


// Route protégé
router.post('/', auth, upload, processImage, bookCtrl.createBook);    // Route pour l'envoie d'un livres
router.put('/:id', auth, upload, processImage, bookCtrl.modifyBook);    // Route pour modifié un livre avec id correspondante
router.delete('/:id', auth, bookCtrl.deleteBook);     // Route pour supprimer un livre avec id correspondante 
// router.post('/:id/rating', auth, bookCtrl, createRatingBook);  // Route pour poster une note sur un livre

module.exports = router;