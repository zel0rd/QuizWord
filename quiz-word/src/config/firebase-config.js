import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDbCiMfHPipjamxx8bjescZd5ZlWDIWbBk",
    authDomain: "quizword-a2d37.firebaseapp.com",
    projectId: "quizword-a2d37",
    storageBucket: "quizword-a2d37.appspot.com",
    messagingSenderId: "335235445215",
    appId: "1:335235445215:web:596082091f2068f2fb546a",
    measurementId: "G-02W2LXZQDE"
  };

  

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;