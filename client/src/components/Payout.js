import React from 'react';
import './Payout.css';

//Popup de paiement 
function Payout({hidePayout}) {
  return (
    <div id="modal">
      <div id="modal-context">
        <div id="exampleLine1"><div onClick={()=>hidePayout()} id="removeModal">
          X
        </div>
          <h1>Payout : </h1>
          <form id="payment-form" action='/api/v1/confirmPurchase' method='post'>
            <label htmlFor="card-number">Card Number</label>
            <input type="text" id="card-number" name="cardNumber" placeholder="1234 5678 9012 3456" required />
            <label htmlFor="card-holder">Card Holder</label>
            <input type="text" id="card-holder" name="cardHolder" placeholder="John Doe" required />
            <div id="flex-row">
              <div>
                <label htmlFor="expiry-date">Expiry Date</label>
                <input type="text" id="expiry-date" name="expiryDate" placeholder="MM/YY" required />
              </div>
              <div>
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" placeholder="123" required />
              </div>
            </div>
            <button type="submit">Submit Payment</button>
          </form>
        </div>
        
      </div>
    </div>

  );
}

export default Payout;
