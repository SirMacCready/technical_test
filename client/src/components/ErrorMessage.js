import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import "./ErrorMessage.css"

//Un composant qui affiche en haut de la page un message d'erreur 
function ErrorMessage() {
    //création des hooks
    const [errorMessage, setErrorMessage] = useState(false);

    //lorsque le composant s'initialise, on stocke temporairement le message dans une constante et on supprime le cookie pour éviter tout conflits avec les futures messages d'erreur
    useEffect(() => {
        //stockage du message
        const storedErrorMessage = Cookies.get('error');

        if (storedErrorMessage) {
        setErrorMessage(storedErrorMessage);
        }
        //suppression du Cookie
        document.cookie = 'error=; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    }, []); 

    //affichage du message
    return (
        <div id="error">
        <h3>{errorMessage}</h3>
        </div>
  );
}

export default ErrorMessage;
