const Book = require('../models/book');

// Controle de logique pour récupérer tous les livres
exports.getAllBooks = (req, res, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

// Controle de logique pour envoyer un livre
exports.createBook = (req, res, next) => {
    delete req.body._id;
    const  book = new Book({
        ...req.body
    });
    book.save()
    .then(() => res.status(201).json({message: 'Livre enregistré avec succès !'}))
    .catch(error => res.status(400).json({ error }));
};

// Controle de logique pour récupérer un livre avec son id correspondante
exports.getOneBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
 };

 // Controle de logique pour modifier un livre avec son id correspondante
exports.modifyBook = (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({message: 'Livre modifié avec succès !'}))
    .catch(error => res.status(400).json({ error }));
};

// Controle de logique pour supprimer un livre avec son id correspondante
exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Livre supprimé avec succès !'}))
    .catch(error => res.status(400).json({ error }));
};