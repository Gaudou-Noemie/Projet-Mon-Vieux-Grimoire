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
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Paramètre de stockage des images téléchargé
const upload = multer({ storage }).single('image');

// conversion des images en WebP
const convertToWebP = async (req, res, next ) => {
    if (!req.file) {
        return next();
    }
   try {
        const originalFilePath = req.file.path;
        const WebpFilePath = path.join('images', req.file.filename.split('.')[0] + '.webp');

        await sharp(originalFilePath)
        .webp({ quality: 20})
        .toFile(WebpFilePath);

        fs.unlinkSync(originalFilePath);

        req.file.path = WebpFilePath;
        req.file.filename = path.basename(WebpFilePath);
        next();
   } catch (error) {
        res.status(500).json({ message: 'Erreur lors la de conversion de l\'image.'});
   } 
     
    
};

module.exports = {upload, convertToWebP};