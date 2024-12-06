const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Controle de logique pour crée un nouvelle utilisateur
exports.signup = (req, res, next) => {
bcrypt.hash(req.body.password, 10)
.then(hash => {
    const user = new User({
        email: req.body.email,
        password: hash
    });
    user.save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès !'}))
    .catch(error => res.status(400).json({ error }));
})
.catch(error => res.status(500).json({ error }));

};

// Controle de logique pour la connexion d'un utilisateur 
exports.login = (req, res, next) => {
User.findOne({ email: req.body.email })
.then(user => {
    if(!user){
        return res.status(401).json({ message: 'Paire email/mot de passe incorrecte !'});
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
        if (!valid){
            return res.status(401).json({ message: 'Paire email/mot de passe incorrecte !'});
        }
        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                process.env.TOKEN_SECRET,
                { expiresIn: '24h'}
            )
        });
        console.log('Generated token:', token);
    })
    .catch(error => res.status(500).json({ error }));
})
.catch(error => res.status(500).json({ error }));
};