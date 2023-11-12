function errorMessage(message,res){
    res.cookie("error", message )
    res.status(303).redirect('/');
}

module.exports = errorMessage