import { Button } from '@mui/material'
import React from 'react'
import './Login.css'
import { auth, provider, signInWithPopup } from '../../firebase'


function Login() {
  const signIn = () => {
    signInWithPopup( auth, provider ).then((result) => {
      //const credential = provider.credentialFromResult(result);
      //const token = credential.accessToken;

      // The signed-in user info.
      //const user = result.user;
      // redux action? --> dispatch({ type: SET_USER, user });
     /* dispatch(setActiveUser({
        userName: result.user.displayName,
        userEmail: result.user.email
      }))*/
    })
    .catch((error) => alert(error.message))
  };

  return (
    <div className="login">
        <div className="login__logo">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Discord_logo.svg/1920px-Discord_logo.svg.png"
                alt=''
            />
        </div>

        <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login