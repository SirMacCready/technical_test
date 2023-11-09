import React, { useState } from 'react';

function Payout() {
  const [isVisible, setVisibility] = useState(false);

  const hidePayout = () => setVisibility(false);

  return isVisible && (
    <div id="popup">
      <div><h1>test ------------------------------------------</h1></div>
      <div onClick={hidePayout}>X</div>
    </div>
  );
}

export default Payout;
