import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ProductsDisplay from './components/ProductsDisplay.js';
import ProductInfo from './components/ProductInfo.js';
import Header from './components/Header.js';
import './index.css';
import Payout from './components/Payout.js';




function App() {
  const [isPayoutVisible, setPayoutVisibility] = useState(false);

  const showPayout = () => {
    document.body.classList.add('no-scroll');
    setPayoutVisibility(true);
  };

  const hidePayout = () => {
    document.body.classList.remove('no-scroll');
    setPayoutVisibility(false);
  };

  return (
    <div className="App">
      <Header showPayout={showPayout} />
      <ProductsDisplay />
      {isPayoutVisible && <Payout hidePayout={hidePayout} />}
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
