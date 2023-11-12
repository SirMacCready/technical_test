import refreshCart from './refreshCart';
//Fonction permettant d'ouvrir le panier
const openCart = (isHidden,setHidden) => {
    //Affichage On Off suivant l'état actuel de setHidden
    setHidden((current) => !current);
    //si le panier est visible, rafraîchissement du panier pour avoir les articles à jour
    if (!isHidden) {
        //fonction pour rafraîchir le panier
        refreshCart();
    }
    };
export default openCart;
