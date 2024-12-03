const express = require('express');

const app = express();


app.use((req, res, next) => {
    console.log('Requête reçue !!');
    next();
});

app.use((req, res, next) => {
    res.status(202);
    next();
});

app.use((req, res, next) => {
    res.json({message: 'Ma première requête à bien été reçue !'});
    next();
});

app.use((req, res) => {
    console.log('Réponse envoyé avec succès !');
})


module.exports = app;