import React from 'react';
//Popup d'inscription
function SignUp({hideSignUp, showLogin}) {
    return (
        <div id="modal">
          <div id="modal-context">
            <div id="exampleLine1">
                <div onClick={()=>hideSignUp()} id="removeModal">
              X
            </div>
              <h1>Sign Up : </h1>
              <form id="signUpForm" action='/users/v1/addUser' method='post'>
                <label htmlFor="email">email </label>
                <input type="text" id="email" name="email" placeholder="myemail@mail.com" required />
                <label htmlFor="password">password </label>
                <input type="password" id="password" name="password" placeholder="********" required />
                <button type="submit">Sign Up</button>
              </form>
            <div onClick={()=>{
                hideSignUp();
                showLogin();
            }}><p>Already have an account ? Log in !</p></div>
            </div>
            
          </div>
        </div>
    
      );
}
export default SignUp;
