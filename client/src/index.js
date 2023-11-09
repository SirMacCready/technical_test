import React from 'react';
import { createRoot } from 'react-dom';
import ProductsDisplay from './components/ProductsDisplay.js';
import ProductInfo from './components/ProductInfo.js';
import Header from './components/Header.js';
import './index.css';
import Payout from './components/Payout.js';

function App() {
  return (
    <div className="App">
      <ProductsDisplay />
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <App />
    <Payout />
  </React.StrictMode>
);
