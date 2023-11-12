const hideComponent = (setComponentVisibility = () =>{}) => {
    console.log(setComponentVisibility);
    document.body.classList.remove('no-scroll');
    setComponentVisibility(false);
  };
export default hideComponent;