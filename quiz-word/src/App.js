import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import { googleProvider } from './config/authMethods';
import socialMediaAuth from './service/auth'
import { delUser } from './service/user.js'
import firebase from "./config/firebase-config";

// var firebase = require('firebase');
var firebaseui = require('firebaseui');

var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};
ui.start('#firebaseui-auth-container', uiConfig);

function App() {
  
  const [accessToken, setAccessToken] = useState("");
  const [userName, setUserName] = useState("");

  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider);
    setUserName(res.additionalUserInfo?.username);
    setAccessToken(res.credential?.accessToken);
    localStorage.setItem('userName',res.additionalUserInfo?.username)
    localStorage.setItem('accessToken',res.credential?.accessToken)
    console.log(res.credential?.accessToken)
    console.log(res.credential?.idToken)
    console.log(res.additionalUserInfo?.profile?.email)
  };

  const handleDelUser = async () => {
    await delUser();
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
      <button onClick={() => handleOnClick(googleProvider)} >로그인</button>
      <button onClick={() => handleDelUser()} >회원탈퇴</button>
    </div>
  );
}

export default App;
