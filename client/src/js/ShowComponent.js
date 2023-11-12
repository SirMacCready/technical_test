//Fonction pour afficher un composant
const showComponent = (setShowComponentVisibility = () =>{}) => {
    //changement de la class en no scroll pour restraindre le scrolling  
    document.body.classList.add('no-scroll');
    //Le composant devient visible
    setShowComponentVisibility(true);
  };
  export default showComponent