var express = require('express');
const path = require('path');
const addUser = require('../src/Data/addUser');
const logIn = require('../src/Data/logIn');
var router = express.Router();
const bcrypt = require('bcrypt');
const errorMessage = require('../src/js/serverError');

//route permettant d'ajouter un utilisateur à la BDD
router.post('/v1/addUser', async (req, res) => {
    //récupération de l'email et mot de passe 
    const {email,password} = req.body
    //constante permettant de vérifier si l'E-mail fourni est correct
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //Vérification de la structure de l'E-mail
    if(!emailRegexp.test(email)) {
        errorMessage("your email is incorrectly formated",res)
    } 
    //traitement de la requête
    else {
        //Chiffrement du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            //Ajout de l'utilisateur et attente de la finalisation de la Query
            await addUser(email,hashedPassword)
            logInData = logIn(email,password)
            //Ajout des cookies de connexion pour une connexion automatique et token unique // Pas eu le temps de l'implémenter
            res.cookie("email", email)
            res.cookie("userId", logInData)
            res.cookie('authToken', generatedToken, { httpOnly: true });
            //redirection à la page principale
            res.redirect("/");
        } 
        catch (error) {
            errorMessage(error,res)
        }
    }
});
//route permettant de se connecter
router.post('/v1/logIn', async (req, res) => {
    const {email,password} = req.body
    try {
        const logInData = await logIn(email, password);
        //cookies de connexion
        res.cookie("email", email)
        res.cookie("userId", logInData)
        res.cookie('authToken', generatedToken, { httpOnly: true });
        res.redirect("/");
    } 
    catch (error) {
        errorMessage(error,res)
    }
});
module.exports = router;