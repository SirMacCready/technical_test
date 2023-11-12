import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function ErrorMessage() {
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    // Get the error message from the cookie
    const storedErrorMessage = Cookies.get('error');

    // Update the state only if there's an error message
    if (storedErrorMessage) {
      setErrorMessage(storedErrorMessage);
    }

    // Clear the 'error' cookie
    document.cookie = 'error=; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div>
      <h3>{errorMessage}</h3>
    </div>
  );
}

export default ErrorMessage;
