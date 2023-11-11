import refreshCart from './refreshCart';
const openCart = (isHidden,setHidden) => {
    setHidden((current) => !current);
    if (!isHidden) {
        refreshCart();
    }
    };
export default openCart;
