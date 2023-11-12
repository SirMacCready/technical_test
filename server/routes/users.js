var express = require('express');
const path = require('path');
const addUser = require('../src/Data/addUser');
const logIn = require('../src/Data/logIn');
var router = express.Router();
const bcrypt = require('bcrypt');
const errorMessage = require('../src/js/serverError');

router.post('/v1/addUser', async (req, res) => {
    const {email,password} = req.body
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!emailRegexp.test(email)) {
        errorMessage("your email is incorrectly formated",res)
    } 
    else {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            addUser(email,hashedPassword)
            logInData = logIn(email,password)
            res.cookie("email", email)
            res.cookie("userId", logInData)
            res.cookie('authToken', generatedToken, { httpOnly: true });
            
            res.redirect("/");
        } 
        catch (error) {
            errorMessage(error,res)
        }
    }
});
router.post('/v1/logIn', async (req, res) => {
    const {email,password} = req.body
    try {
        const logInData = await logIn(email, password);
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