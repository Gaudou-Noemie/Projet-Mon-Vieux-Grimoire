const Book = require('../models/book');
const fs = require('fs');



// Controle de logique pour envoyer un nouveau livre
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    if (!req.file) {
        return res.status(400).json({ message: 'Aucune image téléchargée.'});
    }
    const imagePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    console.log('Chemin de l\'image :', imagePath);

    const  book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: imagePath
    });
    book.save()
    .then(() => res.status(201).json({message: 'Livre enregistré avec succès !'}))
    .catch(error => {
        console.error('Erreur lors de l\'enregistrement du livre :', error);
        res.status(400).json({ error });
    });
};

// Controle de logique pour récupérer tous les livres
exports.getAllBooks = (req, res, next) => {
    Book.find()
    .then(books =>{
        console.log('Livres récupérés :', books);
        res.status(200).json(books);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des livres :', error)
        res.status(500).json({ error });
});
};

// Controle de logique pour récupérer un livre avec son id correspondante
exports.getOneBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
 };

 // Controle de logique pour modifier un livre avec son id correspondante
exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;

    Book.findOne({_id: req.params.id})
    .then((book) => {
        if (book.userId != req.auth.userId) {
            res.status(401).json({ message: 'Not authorized'});
        } else {
            Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
    .then(() => res.status(200).json({message: 'Livre modifié avec succès !'}))
    .catch(error => {
        console.error('Erreur lors de la modification du livre :', error);
        res.status(400).json({ error });
        });
    }
    })
    .catch((error) => {
        console/error('Erreur lors de la recherche du livre :', error);
        res.status(400).json({ error });
    });
};

// Controle de logique pour supprimer un livre avec son id correspondante
exports.deleteBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
    .then(book => {
        if (book.userId != req.auth.userId) {
            res.status(401).json({ message: 'Not authorized'});
        } else {
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Book.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Livre supprimé avec succès !'}))
    .catch(error => {
    console.error('Erreur lors de la suppression du livre :', error);
    res.status(401).json({ error });
            });
        });
        }
    })
    .catch(error => {
        console.error('Erreur lors de la recherche du livre :', error);
        res.status(500).json({ error });
    });
};