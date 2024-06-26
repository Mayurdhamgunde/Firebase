import React from 'react'
import './app.css'
import {app} from "./firebaseconfig"
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup
} from 'firebase/auth'

const App = () => {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const auth = getAuth();
  
  const googleSignUp = () =>{
    signInWithPopup(auth,googleProvider)
    .then((response)=>{
      console.log(response.user);
     })
  }

  const githubSignUp = () =>{
    signInWithPopup(auth,githubProvider)
    .then((response)=>{
      console.log(response.user);
    })
  }

  return (
    <div className='auth-container'>
      <button onClick={googleSignUp}>Google</button>
      <button onClick={githubSignUp}>GitHub</button>
    </div>
  )
}

export default App
