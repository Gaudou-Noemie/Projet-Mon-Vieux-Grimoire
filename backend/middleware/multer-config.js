const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Enregistre temporairement le fichier
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');


const processImage = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const originalName = req.file.originalname.split(' ').join('_').split('.')[0]; // Remplace les espaces par des "_"
    const filename = `${originalName}_${Date.now()}.webp`; // Crée un nouveau nom de fichier avec la date
    const outputDir = path.join(__dirname, '../images');   // Déplace le fichier dans le dossier 'images'
    const outputPath = path.join(outputDir, filename);

    try {

        if (!fs.existsSync(outputDir)){                    // Si le dossier n'existe pas, il le crée
            fs.mkdirSync(outputDir, {recursive: true});
            console.log(`Dossier créé : ${outputDir}`);
        }
        await sharp(req.file.buffer)                        // Modifie l'image, sa taille, sa qualité et son emplacement
        .resize(460,595)
        .webp({ quality: 90 })
        .toFile(outputPath);

        req.file.path = outputPath;
        req.file.filename = filename;

        console.log('Image traitée avec succès');
        next();
    } catch (err) {
        console.error('Erreur lors du traitement de l\'image :', err);
        res.status(500).json({error: 'Erreur lors du traitement de l\'image.'});
    }
};

module.exports = {upload, processImage};
