import React from "react";
import ReactDOM from "react-dom/client";
import ProductsDisplay from './components/ProductsDisplay.js';
import ProductInfo from './components/ProductInfo.js';

function App() {
  return (
    <div className="App">
      <ProductsDisplay />
    </div>
  );
}

function ProductPage() { // Corrected the component name to start with an uppercase letter
  return (
    <div className="ProductPage">
      <ProductInfo />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
);
