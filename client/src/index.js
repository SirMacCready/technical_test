import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ProductsDisplay from './components/ProductsDisplay.js';
import Header from './components/Header.js';
import './index.css';
import Payout from './components/Payout.js';
import hideComponent from './js/HideComponent.js';
import showComponent from './js/ShowComponent.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import ErrorMessage from './components/ErrorMessage.js';


function App() {
  const [isPayoutVisible, setPayoutVisibility] = useState(false);
  const [isLoginVisible, setLoginVisibility] = useState(false);
  const [isSignUpVisible, setSignUpVisibility] = useState(false);

  return (
    <div className="App">
      <ErrorMessage />
      <Header showPayout={() => showComponent(setPayoutVisibility)}  showLogin={() => showComponent(setLoginVisibility)} />
      <ProductsDisplay />
      {isPayoutVisible && <Payout hidePayout = {() =>  hideComponent(setPayoutVisibility)} />}
      {isLoginVisible && <Login hideLogin = {() => hideComponent(setLoginVisibility)} showSignUp = {() => showComponent(setSignUpVisibility)} />}
      {isSignUpVisible && <SignUp hideSignUp = {() => hideComponent(setSignUpVisibility)} showLogin = {() => showComponent(setLoginVisibility)} />}
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
