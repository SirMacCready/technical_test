//Fonction permettant de cacher un composant
const hideComponent = (setComponentVisibility = () =>{}) => {
    //On retire le no-scroll pour pouvoir de nouveau scroller librement
    document.body.classList.remove('no-scroll');
    //Le composant bloqueur n'est plus visible
    setComponentVisibility(false);
  };
export default hideComponent;