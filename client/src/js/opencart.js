import refreshCart from './refreshCart';
const openCart = (isHidden,setHidden) => {
    setHidden((current) => !current);
    if (!isHidden) {
        console.log(isHidden);
        refreshCart();
    }
    };
export default openCart;
