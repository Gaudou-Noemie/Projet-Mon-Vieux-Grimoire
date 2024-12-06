const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Tableau pour le type de fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
 // Config ou et comment sont téléchargé les images avant conversion
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },

    // Config le nom de l'image avec conversion
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, `${name}${Date.now()}.${extension}`);
    }
});

// Paramètre de stockage des images téléchargé
const upload = multer({ storage }).single('image');

// conversion des images en WebP
const convertToWebP = async (req, res, next ) => {
    if (!req.file) {
        console.log('Aucun fichier trouvé');
        return next();
    }
   try {
        const originalFilePath = req.file.path;
        if (!req.file.filename) {
            throw new Error('Le nom du fichier est manquant.');
        }
        const webFileName = req.file.filename.split('.')[0]+ '.webp';
        const WebpFilePath = path.join('images',webFileName);


        if (!req.file.filename || !req.file.path) {
            console.error('Erreur: Le fichier n\'est pas correctement téléchargé.');
            return res.status(400).json({ message: 'Le fichier n\'est pas correctement téléchargé.' });
        }

        await sharp(originalFilePath)
        .webp({ quality: 20 })
        .toFile(WebpFilePath);

        console.log('Fichier WebP créé:', WebpFilePath);
        setTimeout (() => {
               fs.unlinkSync(originalFilePath);
               console.log(`Fichier original suppriméé: ${originalFilePath}`);
        }, 1000);
     

        req.file.path = WebpFilePath;
        req.file.filename = webFileName;
        console.log(`Image convertie en WebP : ${req.file.filename}`);
        next();
   } catch (error) {
    console.error('Erreur lors de la conversion en WebP:', error);
        res.status(500).json({ message: 'Erreur lors la de conversion de l\'image.'});
   } 
     
    
};

module.exports = {upload, convertToWebP};