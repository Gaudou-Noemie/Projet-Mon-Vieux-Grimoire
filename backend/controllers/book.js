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

    const  book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: imagePath,
        ratings: [],
        averageRating: 0
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
        res.status(200).json(books);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des livres :', error)
        res.status(500).json({ error });
});
};

// Controle de logique pour récupérer un livre avec son id correspondante
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé' });
            }
            res.status(200).json(book);
        })
        .catch(error => {
            console.error('Une erreur est survenue', error);
            res.status(500).json({ error });
        });
};

// Controle de logique pour afficher les 3 meilleurs livres
exports.getBestRatings = (req, res, next) => {
    Book.find().sort({ averageRating: -1 }).limit(3)
        .then(books => {
            res.status(200).json(books); 
        })
        .catch(error => {
            console.error('Impossible de les afficher');
            res.status(500).json({ error });
        });
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
            res.status(403).json({ message: 'Unauthorized request'});

            if (req.file) {
                const filename = book.imageUrl.split('/images/')[1]
                fs.unlinkSync(`images/${filename}`)
              }
        } else {
            if (req.file){
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlinkSync(`images/${filename}`);
            }
            Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
    .then(() => res.status(200).json({message: 'Livre modifié avec succès !'}))
    .catch(error => {
        console.error('Erreur lors de la modification du livre :', error);
        res.status(400).json({ error });
        });
    }
    })
    .catch((error) => {
        console.error('Erreur lors de la recherche du livre :', error);
        res.status(400).json({ error });
    });
};

// Controle de logique pour supprimer un livre avec son id correspondante
exports.deleteBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
    .then(book => {
        if (book.userId != req.auth.userId) {
            res.status(403).json({ message: 'Unauthorized request'});
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

// controle de logique pour notez un livre 
exports.createRatingBook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params)
    if (!id) {
        return res.status(400).json({ message: 'ID du livre manquant' });
    }
   const { userId, rating} = req.body;
   console.log(req.body)
    if (!id || !userId || rating === undefined){
        return res.status(400).json({ message: 'Paramètres manquants ou note non spécifiée'});
    }
   if (typeof rating !== 'number' || rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'La note doit être entre 0 et 5'});
    }
const book = await Book.findById(id);
  if (!book){
    return res.status(404).json({ message: 'Livre non trouvé'});
   }

    await book.addOrUpdateRating(userId, rating);
    console.log(message= "Note ajouté avec succès !" );
 return res.status(200).json({ message: 'Note ajouté avec succès', book})

} catch(error) {
    console.error('Erreur lors de l\'ajout de la note :', error);
    res.status(500).json({ error });
}
};