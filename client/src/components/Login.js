import React, { useState } from 'react';
function Login({hideLogin, showSignUp}) {
    return (
        <div id="modal">
          <div id="modal-context">
            <div id="exampleLine1">
                <div onClick={()=>hideLogin()} id="removeModal">
              X
            </div>
              <h1>Login : </h1>
              <form id="connectionForm" action='/users/v1/logIn' method='post'>
                <label htmlFor="email">email </label>
                <input type="text" id="email" name="email" placeholder="myemail@mail.com" required />
                <label htmlFor="password">password </label>
                <input type="text" id="password" name="password" placeholder="********" required />
                <button type="submit">Login</button>
              </form>
            <div onClick={()=>{
                hideLogin();
                showSignUp();
            }}><p>No account § Create one !</p></div>
            </div>
            
          </div>
        </div>
    
      );
}
export default Login;
