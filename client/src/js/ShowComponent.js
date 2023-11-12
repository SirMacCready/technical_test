const showComponent = (setShowComponentVisibility = () =>{}) => {
    document.body.classList.add('no-scroll');
    setShowComponentVisibility(true);
  };
  export default showComponent