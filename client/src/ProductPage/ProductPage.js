import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import './index.css'; // Import your CSS or styling here
import Product from './ProductApp'; // Import your root component

const root = document.getElementById('root');

const rootElement = createRoot(root); // Use createRoot from "react-dom/client"
functi
rootElement.render(
  <React.StrictMode>
    <Product />
  </React.StrictMode>
);
