var express = require('express');
var router = express.Router();
const queryAddToCart = require("../src/Data/Insert")
const getProducts = require('../src/Data/getProducts')
const getCart = require('../src/Data/getCart')
const deleteItem = require('../src/Data/deleteItem')
const placeOrder = require('../src/Data/placeOrder')
const errorMessage = require('../src/js/serverError');

//route permettant de rechercher soit tout les produits si :productName est vide soit les noms d'articles similaires à celui de productName 
router.get('/v1/getproducts/:productName', async (req, res) => {
  //récupération de :productName
    let productName = req.params.productName;

    //préparation de productName pour être traité par le LIKE dans la requête SQL
    productName= "%" + productName.slice(1) + "%";
    try {
        //récupération des articles et attente le temps que la BDD fournisse les articles demandés 
        const results = await getProducts(productName);
        //réponse en JSON
        res.json(results);
    } 
    catch (error) {
        //Message d'erreur suivant ce qui s'est passé de mal
        errorMessage(error,res)
    }
});

//route pour récupérer le panier
router.get('/v1/getCart', async (req, res) => {
  try {
      //récupération et attente des données du panier
      const results = await getCart();
      res.json(results);
  } 
  catch (error) {
      errorMessage(error,res)
  }
});

//route pour ajouter des produits au panier
router.post('/v1/addToCart', async (req, res) => {
    //récupération des variables transmis dans la requêtes
    const { product_id,count,stock,price } = req.body;
    //Si l'utilisateur ajout trop d'articles (plus que ce en stock), une erreur survient lui disant que sa demande dépasse le stock
    try {
      if (count > stock || count <= 0) {
        throw new Error('Count exceeds available stock');
      }
      //Query pour ajouter les produit au panier
      await queryAddToCart(product_id, count,price);
      errorMessage("product added !",res)
    }
    catch (error) {
        errorMessage(error.message,res)
    }
  });

//route pour valider la commande
router.post('/v1/confirmPurchase', async (req, res) => {
  //Pas eu le temps la-dessus// 
  //Récupération des données bancaires afin de les traiter  
  const { cardNumber,cardHolder,expiryDate,cvv } = req.body;
  //Anulation si il y a erreur ou données incomplètes 
  try {
    // if(cardNumber.length < 16 || cardNumber.length > 16 || cvv.length > 3 || cvv.length < 3) {
    //   throw new Error('Something is wrong in your credentials, please retry') 
    // }
    //Commande et attente de l'action d'ajoute de la commande
    await placeOrder();
    errorMessage("Order placed ! Thank you !",res)

  } 
  catch (error) {
      errorMessage(error.message,res)
  }
});

//route permettant de retirer un article de son panier
router.delete('/v1/deleteFromCart', async (req, res) => {
  const {product_id,productName} = req.body
  try {
      //Attente et suppression de l'article du panier
      await deleteItem(product_id);
      errorMessage(productName + " has been deleted from your cart ",res)
  } 
  catch (error) {
      errorMessage(error,res)
  }
});

module.exports = router;