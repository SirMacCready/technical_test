import React from "react";
import ReactDOM from "react-dom/client";
import ProductsDisplay from './components/ProductsDisplay.js';
import ProductInfo from './components/ProductInfo.js';
import Header from "./components/header.js";
import "./index.css"
function App() {
  return (
    <div className="App">
      <ProductsDisplay />
    </div>
  );
}

function ProductPage() {
  return (
    <div className="ProductPage">
      <ProductInfo />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <App /> 
  </React.StrictMode>,
);
